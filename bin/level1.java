import java.util.*;

class Main {
  public static void main(String[] args) {
    // System.out.println("Hello world!");
    // Scanner sc = new Scanner(System.in);

    // System.out.print("input x = ");
    // int x = sc.nextInt();
    // System.out.print("input y = ");
    // int y = sc.nextInt();

    // // int x = 13;
    // // int y = 10;

    // System.out.println("before swap= "+ "x= " + x + ", " + "y= " + y);

    // x = x + y;
    // y = x - y;
    // x = x - y;

    // System.out.println("after swap= "+ "x= " + x + ", " + "y= " + y);

    // ---------------

String original, reverse = ""; // Objects of String class
Scanner in = new Scanner(System.in);
System.out.print("input string / number = ");
original = in.nextLine();
int length = original.length();
for (int i = length - 1; i >= 0; i-- )
reverse = reverse + original.charAt(i);
if (original.equals(reverse))
System.out.println("String / number is a palindrome.");
else
System.out.println("String / number isn't a palindrome.");

  }
}