from cs50 import get_int
# Creating a pyramid of a given height
def main():
    while True:
        height = get_int("Height: ")
        if height > 0 and height < 9:
            break
    build(height, 0)

def build(n, a):
    if n > 1:
        build(n - 1, a + 1)
    print(" " * a, end="")
    print("#" * n)

if __name__ == "__main__":
    main()