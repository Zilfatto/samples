from cs50 import get_int


# Creating two pyramids of a given height
def main():
    while True:
        height = get_int("Height: ")
        if height > 0 and height < 9:
            break
    build(height, 0)


# Recursion function for printing out rows of pyramid
def build(n, a):
    if n > 1:
        # Each function where n > 1 calls another one
        build(n - 1, a + 1)
    print(" " * a, end="")
    print("#" * n, end="  ")
    print("#" * n)


if __name__ == "__main__":
    main()

