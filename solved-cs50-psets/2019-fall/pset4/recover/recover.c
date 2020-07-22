#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        printf("Usage: ./recovery image\n");
        return 1;
    }

    char *infile = argv[1];

    FILE *inptr = fopen(infile, "r");
    if (inptr == NULL)
    {
        printf("Could not open %s\n", infile);
        return 2;
    }

    typedef uint8_t BYTE;

    // A FAT file system whose “block size” is 512 bytes
    BYTE(*block)[512] = calloc(1, 512 * sizeof(BYTE));
    if (block == NULL)
    {
        fclose(inptr);
        printf("Not enough memory.\n");
        return 3;
    }

    char *name = malloc(8 * sizeof(char));
    if (name == NULL)
    {
        printf("Could not create filename");
        return 4;
    }
    // A number of images
    int count = 0;
    // For tracking on the size of reading memory card
    int controle = 512;

    FILE *img = NULL;

    while (controle == 512)
    {
        controle = fread(block[0], sizeof(BYTE), 512, inptr);
        // Finding a pattern of a JPEG image at the begining of a block
        if (block[0][0] == 0xff && block[0][1] == 0xd8 && block[0][2] == 0xff && (block[0][3] & 0xf0) == 0xe0)
        {
            // For first found image
            if (count == 0)
            {
                sprintf(name, "%03i.jpg", count);

                img = fopen(name, "w");

                fwrite(block[0], sizeof(BYTE), 512, img);

                count++;
            }
            // For others
            else
            {
                // For previous file
                fclose(img);

                sprintf(name, "%03i.jpg", count);
                // New one
                img = fopen(name, "w");
                // Writing first block of image into new file
                fwrite(block[0], sizeof(BYTE), 512, img);

                count++;
            }

        }
        // Coming over to the next block
        else
        {
            // The end of a memory card
            if (controle != 512)
            {
                fclose(img);
                fclose(inptr);
                free(block);
                free(name);
            }
            // Block is equal to 512 bytes, "count > 0" for all images except first
            else if (controle == 512 && count > 0)
            {
                // Writing others blocks of image into file
                fwrite(block[0], sizeof(BYTE), 512, img);
            }
        }
    }
    return 0;
}
