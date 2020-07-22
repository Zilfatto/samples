// Copies a BMP file

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

#include "bmp.h"

int main(int argc, char *argv[])
{
    // ensure proper usage
    if (argc != 4)
    {
        fprintf(stderr, "Usage: ./resize i infile outfile\n");
        return 1;
    }

    // remember filenames
    char *infile = argv[2];
    char *outfile = argv[3];

    float n;
    sscanf(argv[1], "%f", &n);
    if (n >= 1 && n <= 100)
    {
        n = roundf(n);
    }
    else if (n > 0 && n < 1)
    {
        n = roundf(n * 10) / 10;
    }
    else
    {
        printf("Invalid f\n");
        return 2;
    }

    // open input file
    FILE *inptr = fopen(infile, "r");
    if (inptr == NULL)
    {
        fprintf(stderr, "Could not open %s.\n", infile);
        return 4;
    }

    // open output file
    FILE *outptr = fopen(outfile, "w");
    if (outptr == NULL)
    {
        fclose(inptr);
        fprintf(stderr, "Could not create %s.\n", outfile);
        return 5;
    }

    // read infile's BITMAPFILEHEADER
    BITMAPFILEHEADER bf;
    fread(&bf, sizeof(BITMAPFILEHEADER), 1, inptr);

    // read infile's BITMAPINFOHEADER
    BITMAPINFOHEADER bi;
    fread(&bi, sizeof(BITMAPINFOHEADER), 1, inptr);

    // ensure infile is (likely) a 24-bit uncompressed BMP 4.0
    if (bf.bfType != 0x4d42 || bf.bfOffBits != 54 || bi.biSize != 40 ||
        bi.biBitCount != 24 || bi.biCompression != 0)
    {
        fclose(outptr);
        fclose(inptr);
        fprintf(stderr, "Unsupported file format.\n");
        return 6;
    }

    int old_width = bi.biWidth;
    int old_heigth = abs(bi.biHeight);

    bi.biWidth *= n;
    bi.biHeight *= n;

    // determine padding for scanlines
    int old_padding = (4 - (old_width * sizeof(RGBTRIPLE)) % 4) % 4;
    int new_padding = (4 - (bi.biWidth * sizeof(RGBTRIPLE)) % 4) % 4;

    bi.biSizeImage = ((sizeof(RGBTRIPLE) * bi.biWidth) + new_padding) * abs(bi.biHeight);
    bf.bfSize = bi.biSizeImage + sizeof(BITMAPFILEHEADER) + sizeof(BITMAPINFOHEADER);

    // write outfile's BITMAPFILEHEADER
    fwrite(&bf, sizeof(BITMAPFILEHEADER), 1, outptr);

    // write outfile's BITMAPINFOHEADER
    fwrite(&bi, sizeof(BITMAPINFOHEADER), 1, outptr);

    if (n >= 1)
    {
        int b = n;
        RGBTRIPLE(*pointer)[bi.biWidth] = malloc(bi.biWidth * sizeof(RGBTRIPLE));
        if (pointer == NULL)
        {
            fprintf(stderr, "Not enough memory to resize image.\n");
            fclose(outptr);
            fclose(inptr);
            return 7;
        }

        // iterate over infile's scanlines
        for (int i = 0; i < old_heigth; i++)
        {
            // iterate over pixels in scanline
            for (int j = 0; j < old_width; j++)
            {
                // temporary storage
                RGBTRIPLE triple;

                // read RGB triple from infile
                fread(&triple, sizeof(RGBTRIPLE), 1, inptr);

                for (int k = 0; k < b; k++)
                {
                    pointer[0][k + (j * b)] = triple;
                }
                printf("%i - %i - %i\n", pointer[i][j].rgbtBlue, pointer[i][j].rgbtGreen, pointer[i][j].rgbtRed);
            }
            // skip over padding, if any
            fseek(inptr, old_padding, SEEK_CUR);

            for (int j = 0; j < b; j++)
            {
                fwrite(*pointer, sizeof(RGBTRIPLE), bi.biWidth, outptr);

                for (int k = 0; k < new_padding; k++)
                {
                    fputc(0x00, outptr);
                }
            }
        }
        free(pointer);
    }
    else
    {
        int width_for_loop = bi.biWidth / n;
        // number of pixels to shrink to one pixel
        int pixels_to_shrink = width_for_loop / bi.biWidth;
        // pixels which will be thrown away in seeking
        int thrown_pixels = (old_width - width_for_loop) * sizeof(RGBTRIPLE);

        RGBTRIPLE(*pointer)[width_for_loop] = calloc(pixels_to_shrink, width_for_loop * sizeof(RGBTRIPLE));
        if (pointer == NULL)
        {
            fprintf(stderr, "Not enough memory to resize image.\n");
            fclose(outptr);
            fclose(inptr);
            return 7;
        }
        RGBTRIPLE(*point_new)[bi.biWidth] = malloc(bi.biWidth * sizeof(RGBTRIPLE));
        if (point_new == NULL)
        {
            fprintf(stderr, "Not enough memory to resize image.\n");
            fclose(outptr);
            fclose(inptr);
            free(pointer);
            return 8;
        }

        for (int i = 0, biHeight = abs(bi.biHeight); i < biHeight; i++)
        {
            for (int j = 0; j < pixels_to_shrink; j++)
            {
                // read RGB triple from infile
                fread(pointer[j], sizeof(RGBTRIPLE), width_for_loop, inptr);

                fseek(inptr, thrown_pixels + old_padding, SEEK_CUR);
            }

            for (int j = 0; j < width_for_loop; j += pixels_to_shrink)
            {
                RGBTRIPLE triple;
                float blue = 0, green = 0, red = 0;
                for (int k = 0; k < pixels_to_shrink; k++)
                {
                    for (int x = 0; x < pixels_to_shrink; x++)
                    {
                        blue += pointer[k][j + x].rgbtBlue;
                        green += pointer[k][j + x].rgbtGreen;
                        red += pointer[k][j + x].rgbtRed;
                    }
                }

                triple.rgbtBlue = round(blue / (pixels_to_shrink * pixels_to_shrink));
                triple.rgbtGreen = round(green / (pixels_to_shrink * pixels_to_shrink));
                triple.rgbtRed = round(red / (pixels_to_shrink * pixels_to_shrink));

                point_new[0][j / pixels_to_shrink] = triple;
            }

            fwrite(point_new[0], sizeof(RGBTRIPLE), bi.biWidth, outptr);
            for (int k = 0; k < new_padding; k++)
            {
                fputc(0x00, outptr);
            }
        }
        free(point_new);
        free(pointer);
    }

    // close infile
    fclose(inptr);

    // close outfile
    fclose(outptr);

    // success
    return 0;
}
