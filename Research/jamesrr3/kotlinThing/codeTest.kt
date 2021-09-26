fun main() {
    var arr1 = listOf(-2, 3, 0)
    var arr2 = listOf(3, 4, 5)
    println("arr1 has " + countPostiveInts(arr1))
    println("arr2 has " + countPostiveInts(arr2))
}

fun countPostiveInts(input: List<Int>) = input.count({it > 0})