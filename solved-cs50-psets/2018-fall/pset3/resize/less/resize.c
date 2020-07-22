// Copies a BMP file

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

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

    int n;
    sscanf(argv[1], "%d", &n);

    if (!(n >= 1 && n <= 100))
    {
        printf("i is wrong\n");
        return 2;
    }

    // open input file
    FILE *inptr = fopen(infile, "r");
    if (inptr == NULL)
    {
        fprintf(stderr, "Could not open %s.\n", infile);
        return 2;
    }

    // open output file
    FILE *outptr = fopen(outfile, "w");
    if (outptr == NULL)
    {
        fclose(inptr);
        fprintf(stderr, "Could not create %s.\n", outfile);
        return 3;
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
        return 4;
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

    RGBTRIPLE(*pointer)[bi.biWidth] = malloc(bi.biWidth * sizeof(RGBTRIPLE));
    if (pointer == NULL)
    {
        fprintf(stderr, "Not enough memory to resize image.\n");
        fclose(outptr);
        fclose(inptr);
        return 5;
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

            for (int k = 0; k < n; k++)
            {
                pointer[0][k + (j * n)] = triple;
            }
        }
        // skip over padding, if any
        fseek(inptr, old_padding, SEEK_CUR);

        for (int j = 0; j < n; j++)
        {
            fwrite(*pointer, sizeof(RGBTRIPLE), bi.biWidth, outptr);

            for (int k = 0; k < new_padding; k++)
            {
                fputc(0x00, outptr);
            }
        }
    }

    free(pointer);

    // close infile
    fclose(inptr);

    // close outfile
    fclose(outptr);

    // success
    return 0;
}
