#include "helpers.h"
#include <math.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            float avg = (float)(image[i][j].rgbtBlue + image[i][j].rgbtGreen + image[i][j].rgbtRed) / 3;

            image[i][j].rgbtBlue = round(avg);
            image[i][j].rgbtGreen = round(avg);
            image[i][j].rgbtRed = round(avg);
        }
    }

    return;
}

// Convert image to sepia
void sepia(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // Computing new red, green and blue values based on the original values of the three
            float sepiaBlue = (float)(.272 * image[i][j].rgbtRed + .534 * image[i][j].rgbtGreen + .131 * image[i][j].rgbtBlue);
            float sepiaGreen = (float)(.349 * image[i][j].rgbtRed + .686 * image[i][j].rgbtGreen + .168 * image[i][j].rgbtBlue);
            float sepiaRed = (float)(.393 * image[i][j].rgbtRed + .769 * image[i][j].rgbtGreen + .189 * image[i][j].rgbtBlue);

            // Pixels cannot have values more than 255 or 0xff
            if (sepiaBlue > 0xff)
            {
                sepiaBlue = 0xff;
            }
            if (sepiaGreen > 0xff)
            {
                sepiaGreen = 0xff;
            }
            if (sepiaRed > 0xff)
            {
                sepiaRed = 0xff;
            }

            image[i][j].rgbtBlue = round(sepiaBlue);
            image[i][j].rgbtGreen = round(sepiaGreen);
            image[i][j].rgbtRed = round(sepiaRed);

        }
    }

    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    // Determing the middle of a width
    int middle = width / 2;
    // Creating an array for storage pixels
    RGBTRIPLE array[middle];

    // Different ways of solving depending on the length of width is even or odd
    // This way is more efficient, but contains more lines of code
    if (width % 2 == 0)
    {
        for (int i = 0; i < height; i++)
        {
            for (int j = width - 1, k = 0; j >= 0; j--, k++)
            {
                if (k < middle)
                {
                    // Before middle, copying pixels into an array
                    array[k] = image[i][k];
                    // Reflecting right pixels to left
                    image[i][k] = image[i][j];
                }
                else
                {
                    // Reflecting copied pixels from left to right
                    image[i][k] = array[j];
                }
            }
        }
    }
    else
    {
        for (int i = 0; i < height; i++)
        {
            for (int j = width - 1, k = 0; j >= 0; j--, k++)
            {
                if (k < middle)
                {
                    // Before middle, copying pixels into an array
                    array[k] = image[i][k];
                    // Reflecting right pixels to left
                    image[i][k] = image[i][j];
                }
                else if (k > middle)
                {
                    // Reflecting copied pixels from left to right
                    image[i][k] = array[j];
                }
                // middle pixel doesn't need to be reflected
            }
        }
    }
    return;

    // There is a more simple way of solving that, but this way is slower,
    // and takes more memory

    //RGBTRIPLE array[width];

    //for (int i = 0; i < height; i++)
    //{
    //    -- Putting i row of pixels into an array in reverse order
    //    for (int j = width - 1, k = 0; j >= 0; j--, k++)
    //    {
    //        array[k] = image[i][j];
    //    }

    //    -- Returning i row reflected pixels to the image
    //    for (int k = 0; k < width; k++)
    //    {
    //        image[i][k] = array[k];
    //    }
    //}
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    // Storage for 2 rows of piexels
    // First row is for changed values
    // Second row is for copying original row which will be changed
    RGBTRIPLE array[2][width];

    // Using "box blur", which works by taking each pixel and, for each color value,
    // giving it a new value by averaging the color values based on the 3x3 grid of pixels
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // For putting average values into them
            float blue, green, red;

            // The top row
            if (i == 0)
            {
                // The left top corner
                if (j == 0)
                {
                    blue = (float)(image[i][j].rgbtBlue + image[i][j + 1].rgbtBlue + image[i + 1][j].rgbtBlue + image[i + 1][j + 1].rgbtBlue) / 4;
                    green = (float)(image[i][j].rgbtGreen + image[i][j + 1].rgbtGreen + image[i + 1][j].rgbtGreen + image[i + 1][j + 1].rgbtGreen) / 4;
                    red = (float)(image[i][j].rgbtRed + image[i][j + 1].rgbtRed + image[i + 1][j].rgbtRed + image[i + 1][j + 1].rgbtRed) / 4;

                    array[0][j].rgbtBlue = round(blue);
                    array[0][j].rgbtGreen = round(green);
                    array[0][j].rgbtRed = round(red);
                }
                // The row
                else if (j > 0 && j < width - 1)
                {
                    blue = (float)(image[i][j - 1].rgbtBlue + image[i][j].rgbtBlue + image[i][j + 1].rgbtBlue + image[i + 1][j - 1].rgbtBlue + image[i +
                                   1][j].rgbtBlue + image[i + 1][j + 1].rgbtBlue) / 6;
                    green = (float)(image[i][j - 1].rgbtGreen + image[i][j].rgbtGreen + image[i][j + 1].rgbtGreen + image[i + 1][j - 1].rgbtGreen +
                                    image[i + 1][j].rgbtGreen + image[i + 1][j + 1].rgbtGreen) / 6;
                    red = (float)(image[i][j - 1].rgbtRed + image[i][j].rgbtRed + image[i][j + 1].rgbtRed + image[i + 1][j - 1].rgbtRed + image[i +
                                  1][j].rgbtRed + image[i + 1][j + 1].rgbtRed) / 6;

                    array[0][j].rgbtBlue = round(blue);
                    array[0][j].rgbtGreen = round(green);
                    array[0][j].rgbtRed = round(red);
                }
                // The right top corner
                else
                {
                    blue = (float)(image[i][j - 1].rgbtBlue + image[i][j].rgbtBlue + image[i + 1][j - 1].rgbtBlue + image[i + 1][j].rgbtBlue) / 4;
                    green = (float)(image[i][j - 1].rgbtGreen + image[i][j].rgbtGreen + image[i + 1][j - 1].rgbtGreen + image[i + 1][j].rgbtGreen) / 4;
                    red = (float)(image[i][j - 1].rgbtRed + image[i][j].rgbtRed + image[i + 1][j - 1].rgbtRed + image[i + 1][j].rgbtRed) / 4;

                    array[0][j].rgbtBlue = round(blue);
                    array[0][j].rgbtGreen = round(green);
                    array[0][j].rgbtRed = round(red);
                }

            }
            // Rows from top to bottom not included
            else if (i > 0 && i < height - 1)
            {
                // The left column
                if (j == 0)
                {
                    blue = (float)(array[1][j].rgbtBlue + array[1][j + 1].rgbtBlue + image[i][j].rgbtBlue + image[i][j + 1].rgbtBlue + image[i +
                                   1][j].rgbtBlue + image[i + 1][j + 1].rgbtBlue) / 6;
                    green = (float)(array[1][j].rgbtGreen + array[1][j + 1].rgbtGreen + image[i][j].rgbtGreen + image[i][j + 1].rgbtGreen + image[i +
                                    1][j].rgbtGreen + image[i + 1][j + 1].rgbtGreen) / 6;
                    red = (float)(array[1][j].rgbtRed + array[1][j + 1].rgbtRed + image[i][j].rgbtRed + image[i][j + 1].rgbtRed + image[i +
                                  1][j].rgbtRed + image[i + 1][j + 1].rgbtRed) / 6;

                    array[0][j].rgbtBlue = round(blue);
                    array[0][j].rgbtGreen = round(green);
                    array[0][j].rgbtRed = round(red);
                }
                // Medium
                else if (j > 0 && j < width - 1)
                {
                    blue = (float)(array[1][j - 1].rgbtBlue + array[1][j].rgbtBlue + array[1][j + 1].rgbtBlue + image[i][j - 1].rgbtBlue +
                                   image[i][j].rgbtBlue + image[i][j + 1].rgbtBlue + image[i + 1][j - 1].rgbtBlue + image[i + 1][j].rgbtBlue + image[i + 1][j +
                                           1].rgbtBlue) / 9;
                    green = (float)(array[1][j - 1].rgbtGreen + array[1][j].rgbtGreen + array[1][j + 1].rgbtGreen + image[i][j - 1].rgbtGreen +
                                    image[i][j].rgbtGreen + image[i][j + 1].rgbtGreen + image[i + 1][j - 1].rgbtGreen + image[i + 1][j].rgbtGreen + image[i + 1][j +
                                            1].rgbtGreen) / 9;
                    red = (float)(array[1][j - 1].rgbtRed + array[1][j].rgbtRed + array[1][j + 1].rgbtRed + image[i][j - 1].rgbtRed +
                                  image[i][j].rgbtRed + image[i][j + 1].rgbtRed + image[i + 1][j - 1].rgbtRed + image[i + 1][j].rgbtRed + image[i + 1][j +
                                          1].rgbtRed) / 9;

                    array[0][j].rgbtBlue = round(blue);
                    array[0][j].rgbtGreen = round(green);
                    array[0][j].rgbtRed = round(red);
                }
                // The right culumn
                else
                {
                    blue = (float)(array[1][j - 1].rgbtBlue + array[1][j].rgbtBlue + image[i][j - 1].rgbtBlue + image[i][j].rgbtBlue + image[i + 1][j -
                                   1].rgbtBlue + image[i + 1][j].rgbtBlue) / 6;
                    green = (float)(array[1][j - 1].rgbtGreen + array[1][j].rgbtGreen + image[i][j - 1].rgbtGreen + image[i][j].rgbtGreen + image[i +
                                    1][j - 1].rgbtGreen + image[i + 1][j].rgbtGreen) / 6;
                    red = (float)(array[1][j - 1].rgbtRed + array[1][j].rgbtRed + image[i][j - 1].rgbtRed + image[i][j].rgbtRed + image[i + 1][j -
                                  1].rgbtRed + image[i + 1][j].rgbtRed) / 6;

                    array[0][j].rgbtBlue = round(blue);
                    array[0][j].rgbtGreen = round(green);
                    array[0][j].rgbtRed = round(red);
                }

            }
            // The bottom row
            else
            {
                // The left bottom corner
                if (j == 0)
                {
                    blue = (float)(array[1][j].rgbtBlue + array[1][j + 1].rgbtBlue + image[i][j].rgbtBlue + image[i][j + 1].rgbtBlue) / 4;
                    green = (float)(array[1][j].rgbtGreen + array[1][j + 1].rgbtGreen + image[i][j].rgbtGreen + image[i][j + 1].rgbtGreen) / 4;
                    red = (float)(array[1][j].rgbtRed + array[1][j + 1].rgbtRed + image[i][j].rgbtRed + image[i][j + 1].rgbtRed) / 4;

                    array[0][j].rgbtBlue = round(blue);
                    array[0][j].rgbtGreen = round(green);
                    array[0][j].rgbtRed = round(red);
                }
                // The bottom row
                else if (j > 0 && j < width - 1)
                {
                    blue = (float)(array[1][j - 1].rgbtBlue + array[1][j].rgbtBlue + array[1][j + 1].rgbtBlue + image[i][j - 1].rgbtBlue +
                                   image[i][j].rgbtBlue + image[i][j + 1].rgbtBlue) / 6;
                    green = (float)(array[1][j - 1].rgbtGreen + array[1][j].rgbtGreen + array[1][j + 1].rgbtGreen + image[i][j - 1].rgbtGreen +
                                    image[i][j].rgbtGreen + image[i][j + 1].rgbtGreen) / 6;
                    red = (float)(array[1][j - 1].rgbtRed + array[1][j].rgbtRed + array[1][j + 1].rgbtRed + image[i][j - 1].rgbtRed +
                                  image[i][j].rgbtRed + image[i][j + 1].rgbtRed) / 6;

                    array[0][j].rgbtBlue = round(blue);
                    array[0][j].rgbtGreen = round(green);
                    array[0][j].rgbtRed = round(red);
                }
                // The right bottom corner
                else
                {
                    blue = (float)(array[1][j - 1].rgbtBlue + array[1][j].rgbtBlue + image[i][j - 1].rgbtBlue + image[i][j].rgbtBlue) / 4;
                    green = (float)(array[1][j - 1].rgbtGreen + array[1][j].rgbtGreen + image[i][j - 1].rgbtGreen + image[i][j].rgbtGreen) / 4;
                    red = (float)(array[1][j - 1].rgbtRed + array[1][j].rgbtRed + image[i][j - 1].rgbtRed + image[i][j].rgbtRed) / 4;

                    array[0][j].rgbtBlue = round(blue);
                    array[0][j].rgbtGreen = round(green);
                    array[0][j].rgbtRed = round(red);
                }
            }

        }

        // After iterating over a row, copying original upper row which was used for averaging for
        // future use and then changing this row oroginal row
        for (int k = 0; k < width; k++)
        {
            array[1][k] = image[i][k];
            image[i][k] = array[0][k];
        }
    }

    return;
}

// Detect edges
void edges(int height, int width, RGBTRIPLE image[height][width])
{
    // Storage for 2 rows of piexels
    // First row is for changed values
    // Second row is for copying original row which will be changed
    RGBTRIPLE array[2][width];

    // Edge detection also works by taking each pixel, and modifying it
    // based on the 3x3 grid of pixels that surrounds that pixel.

    // But the Sobel operator computes the new value of each pixel by taking
    // a weighted sum of the values for the surrounding pixels.
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // x's and y's colours for detecting edges in the x direction and y direction respectively
            int xblue, xgreen, xred, yblue, ygreen, yred;

            // The top row
            if (i == 0)
            {
                // The top left corner
                if (j == 0)
                {
                    xblue = 2 * image[i][j + 1].rgbtBlue  + image[i + 1][j + 1].rgbtBlue;
                    xgreen = 2 * image[i][j + 1].rgbtGreen  + image[i + 1][j + 1].rgbtGreen;
                    xred = 2 * image[i][j + 1].rgbtRed + image[i + 1][j + 1].rgbtRed;

                    yblue = 2 * image[i + 1][j].rgbtBlue + image[i + 1][j + 1].rgbtBlue;
                    ygreen = 2 * image[i + 1][j].rgbtGreen + image[i + 1][j + 1].rgbtGreen;
                    yred = 2 * image[i + 1][j].rgbtRed + image[i + 1][j + 1].rgbtRed;

                    xblue = round(sqrt((float)(xblue * xblue + yblue * yblue)));
                    xgreen = round(sqrt((float)(xgreen * xgreen + ygreen * ygreen)));
                    xred = round(sqrt((float)(xred * xred + yred * yred)));

                    // A value of a pixel cannot be greater than 255 or 0xff
                    if (xblue > 0xff)
                    {
                        xblue = 0xff;
                    }
                    if (xgreen > 0xff)
                    {
                        xgreen = 0xff;
                    }
                    if (xred > 0xff)
                    {
                        xred = 0xff;
                    }

                    array[0][j].rgbtBlue = xblue;
                    array[0][j].rgbtGreen = xgreen;
                    array[0][j].rgbtRed = xred;
                }
                // The top row
                else if (j > 0 && j < width - 1)
                {
                    xblue = -2 * image[i][j - 1].rgbtBlue + 2 * image[i][j + 1].rgbtBlue + -1 * image[i + 1][j - 1].rgbtBlue + image[i + 1][j +
                            1].rgbtBlue;
                    xgreen = -2 * image[i][j - 1].rgbtGreen + 2 * image[i][j + 1].rgbtGreen + -1 * image[i + 1][j - 1].rgbtGreen + image[i + 1][j +
                             1].rgbtGreen;
                    xred = -2 * image[i][j - 1].rgbtRed + 2 * image[i][j + 1].rgbtRed + -1 * image[i + 1][j - 1].rgbtRed + image[i + 1][j + 1].rgbtRed;

                    yblue = image[i + 1][j - 1].rgbtBlue + 2 * image[i + 1][j].rgbtBlue + image[i + 1][j + 1].rgbtBlue;
                    ygreen = image[i + 1][j - 1].rgbtGreen + 2 * image[i + 1][j].rgbtGreen + image[i + 1][j + 1].rgbtGreen;
                    yred = image[i + 1][j - 1].rgbtRed + 2 * image[i + 1][j].rgbtRed + image[i + 1][j + 1].rgbtRed;

                    xblue = round(sqrt((float)(xblue * xblue + yblue * yblue)));
                    xgreen = round(sqrt((float)(xgreen * xgreen + ygreen * ygreen)));
                    xred = round(sqrt((float)(xred * xred + yred * yred)));

                    if (xblue > 0xff)
                    {
                        xblue = 0xff;
                    }
                    if (xgreen > 0xff)
                    {
                        xgreen = 0xff;
                    }
                    if (xred > 0xff)
                    {
                        xred = 0xff;
                    }

                    array[0][j].rgbtBlue = xblue;
                    array[0][j].rgbtGreen = xgreen;
                    array[0][j].rgbtRed = xred;
                }
                // The top right corner
                else
                {
                    xblue = -2 * image[i][j - 1].rgbtBlue + -1 * image[i + 1][j - 1].rgbtBlue;
                    xgreen = -2 * image[i][j - 1].rgbtGreen + -1 * image[i + 1][j - 1].rgbtGreen;
                    xred = -2 * image[i][j - 1].rgbtRed + -1 * image[i + 1][j - 1].rgbtRed;

                    yblue = image[i + 1][j - 1].rgbtBlue + 2 * image[i + 1][j].rgbtBlue;
                    ygreen = image[i + 1][j - 1].rgbtGreen + 2 * image[i + 1][j].rgbtGreen;
                    yred = image[i + 1][j - 1].rgbtRed + 2 * image[i + 1][j].rgbtRed;

                    xblue = round(sqrt((float)(xblue * xblue + yblue * yblue)));
                    xgreen = round(sqrt((float)(xgreen * xgreen + ygreen * ygreen)));
                    xred = round(sqrt((float)(xred * xred + yred * yred)));

                    if (xblue > 0xff)
                    {
                        xblue = 0xff;
                    }
                    if (xgreen > 0xff)
                    {
                        xgreen = 0xff;
                    }
                    if (xred > 0xff)
                    {
                        xred = 0xff;
                    }

                    array[0][j].rgbtBlue = xblue;
                    array[0][j].rgbtGreen = xgreen;
                    array[0][j].rgbtRed = xred;

                }

            }
            // The middle rows
            else if (i > 0 && i < height - 1)
            {
                // The left column
                if (j == 0)
                {
                    xblue = array[1][j + 1].rgbtBlue + 2 * image[i][j + 1].rgbtBlue + image[i + 1][j + 1].rgbtBlue;
                    xgreen = array[1][j + 1].rgbtGreen + 2 * image[i][j + 1].rgbtGreen + image[i + 1][j + 1].rgbtGreen;
                    xred = array[1][j + 1].rgbtRed + 2 * image[i][j + 1].rgbtRed + image[i + 1][j + 1].rgbtRed;

                    yblue = -2 * array[1][j].rgbtBlue + -1 * array[1][j + 1].rgbtBlue + 2 * image[i + 1][j].rgbtBlue + image[i + 1][j + 1].rgbtBlue;
                    ygreen = -2 * array[1][j].rgbtGreen + -1 * array[1][j + 1].rgbtGreen + 2 * image[i + 1][j].rgbtGreen + image[i + 1][j +
                             1].rgbtGreen;
                    yred = -2 * array[1][j].rgbtRed + -1 * array[1][j + 1].rgbtRed + 2 * image[i + 1][j].rgbtRed + image[i + 1][j + 1].rgbtRed;

                    xblue = round(sqrt((float)(xblue * xblue + yblue * yblue)));
                    xgreen = round(sqrt((float)(xgreen * xgreen + ygreen * ygreen)));
                    xred = round(sqrt((float)(xred * xred + yred * yred)));

                    if (xblue > 0xff)
                    {
                        xblue = 0xff;
                    }
                    if (xgreen > 0xff)
                    {
                        xgreen = 0xff;
                    }
                    if (xred > 0xff)
                    {
                        xred = 0xff;
                    }

                    array[0][j].rgbtBlue = xblue;
                    array[0][j].rgbtGreen = xgreen;
                    array[0][j].rgbtRed = xred;

                }
                // The medium
                else if (j > 0 && j < width - 1)
                {
                    xblue = -1 * array[1][j - 1].rgbtBlue + array[1][j + 1].rgbtBlue + -2 * image[i][j - 1].rgbtBlue +
                            2 * image[i][j + 1].rgbtBlue + -1 * image[i + 1][j - 1].rgbtBlue + image[i + 1][j + 1].rgbtBlue;
                    xgreen = -1 * array[1][j - 1].rgbtGreen + array[1][j + 1].rgbtGreen + -2 * image[i][j - 1].rgbtGreen +
                             2 * image[i][j + 1].rgbtGreen + -1 * image[i + 1][j - 1].rgbtGreen + image[i + 1][j + 1].rgbtGreen;
                    xred = -1 * array[1][j - 1].rgbtRed + array[1][j + 1].rgbtRed + -2 * image[i][j - 1].rgbtRed +
                           2 * image[i][j + 1].rgbtRed + -1 * image[i + 1][j - 1].rgbtRed + image[i + 1][j + 1].rgbtRed;

                    yblue = -1 * array[1][j - 1].rgbtBlue + -2 * array[1][j].rgbtBlue + -1 * array[1][j + 1].rgbtBlue +
                            image[i + 1][j - 1].rgbtBlue + 2 * image[i + 1][j].rgbtBlue + image[i + 1][j + 1].rgbtBlue;
                    ygreen = -1 * array[1][j - 1].rgbtGreen + -2 * array[1][j].rgbtGreen + -1 * array[1][j + 1].rgbtGreen +
                             image[i + 1][j - 1].rgbtGreen + 2 * image[i + 1][j].rgbtGreen + image[i + 1][j + 1].rgbtGreen;
                    yred = -1 * array[1][j - 1].rgbtRed + -2 * array[1][j].rgbtRed + -1 * array[1][j + 1].rgbtRed +
                           image[i + 1][j - 1].rgbtRed + 2 * image[i + 1][j].rgbtRed + image[i + 1][j + 1].rgbtRed;

                    xblue = round(sqrt((float)(xblue * xblue + yblue * yblue)));
                    xgreen = round(sqrt((float)(xgreen * xgreen + ygreen * ygreen)));
                    xred = round(sqrt((float)(xred * xred + yred * yred)));

                    if (xblue > 0xff)
                    {
                        xblue = 0xff;
                    }
                    if (xgreen > 0xff)
                    {
                        xgreen = 0xff;
                    }
                    if (xred > 0xff)
                    {
                        xred = 0xff;
                    }

                    array[0][j].rgbtBlue = xblue;
                    array[0][j].rgbtGreen = xgreen;
                    array[0][j].rgbtRed = xred;

                }
                // The right column
                else
                {
                    xblue = -1 * array[1][j - 1].rgbtBlue + -2 *  image[i][j - 1].rgbtBlue + -1 * image[i + 1][j - 1].rgbtBlue;
                    xgreen = -1 * array[1][j - 1].rgbtGreen + -2 * image[i][j - 1].rgbtGreen + -1 * image[i + 1][j - 1].rgbtGreen;
                    xred = -1 * array[1][j - 1].rgbtRed + -2 * image[i][j - 1].rgbtRed + -1 * image[i + 1][j - 1].rgbtRed;


                    yblue = -1 * array[1][j - 1].rgbtBlue + -2 * array[1][j].rgbtBlue + image[i + 1][j - 1].rgbtBlue + 2 * image[i + 1][j].rgbtBlue;
                    ygreen = -1 * array[1][j - 1].rgbtGreen + -2 * array[1][j].rgbtGreen + image[i + 1][j - 1].rgbtGreen + 2 *  image[i +
                             1][j].rgbtGreen;
                    yred = -1 * array[1][j - 1].rgbtRed + -2 * array[1][j].rgbtRed + image[i + 1][j - 1].rgbtRed + 2 * image[i + 1][j].rgbtRed;

                    xblue = round(sqrt((float)(xblue * xblue + yblue * yblue)));
                    xgreen = round(sqrt((float)(xgreen * xgreen + ygreen * ygreen)));
                    xred = round(sqrt((float)(xred * xred + yred * yred)));

                    if (xblue > 0xff)
                    {
                        xblue = 0xff;
                    }
                    if (xgreen > 0xff)
                    {
                        xgreen = 0xff;
                    }
                    if (xred > 0xff)
                    {
                        xred = 0xff;
                    }

                    array[0][j].rgbtBlue = xblue;
                    array[0][j].rgbtGreen = xgreen;
                    array[0][j].rgbtRed = xred;

                }

            }
            // The bottom row
            else
            {
                // The left bottom corner
                if (j == 0)
                {
                    xblue = array[1][j + 1].rgbtBlue + 2 * image[i][j + 1].rgbtBlue;
                    xgreen = array[1][j + 1].rgbtGreen + 2 * image[i][j + 1].rgbtGreen;
                    xred = array[1][j + 1].rgbtRed + 2 * image[i][j + 1].rgbtRed;

                    yblue = -2 * array[1][j].rgbtBlue + -1 * array[1][j + 1].rgbtBlue;
                    ygreen = -2 * array[1][j].rgbtGreen + -1 * array[1][j + 1].rgbtGreen;
                    yred = -2 * array[1][j].rgbtRed + -1 * array[1][j + 1].rgbtRed;


                    xblue = round(sqrt((float)(xblue * xblue + yblue * yblue)));
                    xgreen = round(sqrt((float)(xgreen * xgreen + ygreen * ygreen)));
                    xred = round(sqrt((float)(xred * xred + yred * yred)));

                    if (xblue > 0xff)
                    {
                        xblue = 0xff;
                    }
                    if (xgreen > 0xff)
                    {
                        xgreen = 0xff;
                    }
                    if (xred > 0xff)
                    {
                        xred = 0xff;
                    }

                    array[0][j].rgbtBlue = xblue;
                    array[0][j].rgbtGreen = xgreen;
                    array[0][j].rgbtRed = xred;

                }
                // The bottom row
                else if (j > 0 && j < width - 1)
                {
                    xblue = -1 * array[1][j - 1].rgbtBlue + array[1][j + 1].rgbtBlue + -2 * image[i][j - 1].rgbtBlue + 2 * image[i][j + 1].rgbtBlue;
                    xgreen = -1 * array[1][j - 1].rgbtGreen + array[1][j + 1].rgbtGreen + -2 * image[i][j - 1].rgbtGreen + 2 * image[i][j +
                             1].rgbtGreen;
                    xred = -1 * array[1][j - 1].rgbtRed + array[1][j + 1].rgbtRed + -2 * image[i][j - 1].rgbtRed + 2 * image[i][j + 1].rgbtRed;

                    yblue = -1 * array[1][j - 1].rgbtBlue + -2 * array[1][j].rgbtBlue + -1 * array[1][j + 1].rgbtBlue;
                    ygreen = -1 * array[1][j - 1].rgbtGreen + -2 * array[1][j].rgbtGreen + -1 * array[1][j + 1].rgbtGreen;
                    yred = -1 * array[1][j - 1].rgbtRed + -2 * array[1][j].rgbtRed + -1 * array[1][j + 1].rgbtRed;

                    xblue = round(sqrt((float)(xblue * xblue + yblue * yblue)));
                    xgreen = round(sqrt((float)(xgreen * xgreen + ygreen * ygreen)));
                    xred = round(sqrt((float)(xred * xred + yred * yred)));

                    if (xblue > 0xff)
                    {
                        xblue = 0xff;
                    }
                    if (xgreen > 0xff)
                    {
                        xgreen = 0xff;
                    }
                    if (xred > 0xff)
                    {
                        xred = 0xff;
                    }

                    array[0][j].rgbtBlue = xblue;
                    array[0][j].rgbtGreen = xgreen;
                    array[0][j].rgbtRed = xred;

                }
                // The right bottom corner
                else
                {
                    xblue = -1 * array[1][j - 1].rgbtBlue + -2 * image[i][j - 1].rgbtBlue;
                    xgreen = -1 * array[1][j - 1].rgbtGreen + -2 * image[i][j - 1].rgbtGreen;
                    xred = -1 * array[1][j - 1].rgbtRed + -2 * image[i][j - 1].rgbtRed;

                    yblue = -1 * array[1][j - 1].rgbtBlue + -2 * array[1][j].rgbtBlue;
                    ygreen = -1 * array[1][j - 1].rgbtGreen + -2 * array[1][j].rgbtGreen;
                    yred = -1 * array[1][j - 1].rgbtRed + -2 * array[1][j].rgbtRed;

                    xblue = round(sqrt((float)(xblue * xblue + yblue * yblue)));
                    xgreen = round(sqrt((float)(xgreen * xgreen + ygreen * ygreen)));
                    xred = round(sqrt((float)(xred * xred + yred * yred)));

                    if (xblue > 0xff)
                    {
                        xblue = 0xff;
                    }
                    if (xgreen > 0xff)
                    {
                        xgreen = 0xff;
                    }
                    if (xred > 0xff)
                    {
                        xred = 0xff;
                    }

                    array[0][j].rgbtBlue = xblue;
                    array[0][j].rgbtGreen = xgreen;
                    array[0][j].rgbtRed = xred;

                }
            }

        }
        // After iterating over a row, copying original upper row which was used for averaging for
        // future use and then changing this row oroginal row
        for (int k = 0; k < width; k++)
        {
            array[1][k] = image[i][k];
            image[i][k] = array[0][k];
        }
    }
    return;
}