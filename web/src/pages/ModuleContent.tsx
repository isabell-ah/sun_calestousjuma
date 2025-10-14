/*
 * CJLF LICENSE (c) 2025
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    BookOpen,
    Code,
    Lightbulb,
} from "lucide-react";
import { api } from "@/lib/api";

// Mock learning content - in a real app, this would come from your CMS/API
const getModuleContent = (trackId: string, moduleId: string) => {
    const content: any = {
        beginner: {
            1: {
                title: "Variables and Data Types",
                content: `
# Variables and Data Types in Python

## What are Variables?
Variables are containers that store data values. In Python, you don't need to declare the type of variable explicitly.

## Basic Data Types

### 1. Numbers
\`\`\`python
# Integer
age = 25
print(age)  # Output: 25

# Float
price = 19.99
print(price)  # Output: 19.99
\`\`\`

### 2. Strings
\`\`\`python
# String
name = "Alice"
message = 'Hello, World!'
print(name)     # Output: Alice
print(message)  # Output: Hello, World!
\`\`\`

### 3. Booleans
\`\`\`python
# Boolean
is_student = True
is_working = False
print(is_student)  # Output: True
\`\`\`

## Variable Naming Rules
- Must start with a letter or underscore
- Can contain letters, numbers, and underscores
- Case-sensitive
- Cannot use Python keywords

## Try It Yourself!
Create variables for your name, age, and whether you like programming.
                `,
                exercises: [
                    {
                        title: "Create Your Profile",
                        description: "Create variables to store your personal information",
                        starterCode: `# Create variables for your profile
# Your name (string)
name =

# Your age (integer)
age =

# Do you like programming? (boolean)
likes_programming =

# Print all variables
print("Name:", name)
print("Age:", age)
print("Likes Programming:", likes_programming)`,
                        solution: `name = "John Doe"
age = 25
likes_programming = True

print("Name:", name)
print("Age:", age)
print("Likes Programming:", likes_programming)`
                    }
                ]
            },
            2: {
                title: "Control Flow (if/else)",
                content: `
# Control Flow with if/else

## Making Decisions in Code
Control flow allows your program to make decisions based on conditions.

## Basic if Statement
\`\`\`python
age = 18
if age >= 18:
    print("You are an adult!")
\`\`\`

## if/else Statement
\`\`\`python
temperature = 25
if temperature > 30:
    print("It's hot outside!")
else:
    print("It's not too hot.")
\`\`\`

## if/elif/else Statement
\`\`\`python
score = 85
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: F")
\`\`\`

## Comparison Operators
- \`==\` Equal to
- \`!=\` Not equal to
- \`>\` Greater than
- \`<\` Less than
- \`>=\` Greater than or equal to
- \`<=\` Less than or equal to
                `,
                exercises: [
                    {
                        title: "Grade Calculator",
                        description: "Write a program that assigns letter grades based on numeric scores",
                        starterCode: `# Grade Calculator
score = 87  # You can change this value

# Write your if/elif/else logic here
# 90-100: A
# 80-89: B
# 70-79: C
# 60-69: D
# Below 60: F

`,
                        solution: `score = 87

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Score: {score}, Grade: {grade}")`
                    }
                ]
            },
            3: {
                title: "Loops (for/while)",
                content: `
# Loops in Python

## For Loops
For loops are used to iterate over sequences like lists, strings, or ranges.

\`\`\`python
# Loop through a list
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(fruit)

# Loop through a range
for i in range(5):
    print(f"Number: {i}")
\`\`\`

## While Loops
While loops continue as long as a condition is true.

\`\`\`python
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1
\`\`\`
                `,
                exercises: [
                    {
                        title: "Number Counter",
                        description: "Create a loop that counts from 1 to 10",
                        starterCode: `# Count from 1 to 10
# Use a for loop with range()

`,
                        solution: `for i in range(1, 11):
    print(f"Number: {i}")`
                    }
                ]
            }
        },
        intermediate: {
            1: {
                title: "Arrays and Strings",
                content: `
# Arrays and Strings

## Working with Lists (Arrays)
Lists are ordered collections that can hold multiple items.

\`\`\`python
# Creating lists
numbers = [1, 2, 3, 4, 5]
names = ["Alice", "Bob", "Charlie"]

# Accessing elements
print(numbers[0])  # First element
print(numbers[-1]) # Last element
\`\`\`

## String Manipulation
Strings are sequences of characters.

\`\`\`python
text = "Hello, World!"
print(text.upper())    # HELLO, WORLD!
print(text.lower())    # hello, world!
print(text.split(",")) # ['Hello', ' World!']
\`\`\`
                `,
                exercises: [
                    {
                        title: "List Operations",
                        description: "Practice basic list operations",
                        starterCode: `# Create a list of your favorite colors
colors = []

# Add some colors to the list
# Print the list
# Print the first and last color

`,
                        solution: `colors = ["blue", "green", "red", "purple"]
print("All colors:", colors)
print("First color:", colors[0])
print("Last color:", colors[-1])`
                    }
                ]
            }
        },
        advanced: {
            1: {
                title: "Object-Oriented Programming",
                content: `
# Object-Oriented Programming

## Classes and Objects
Classes are blueprints for creating objects.

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hello, I'm {self.name} and I'm {self.age} years old"

# Create an object
person = Person("Alice", 25)
print(person.greet())
\`\`\`
                `,
                exercises: [
                    {
                        title: "Create a Car Class",
                        description: "Define a Car class with make, model, and year",
                        starterCode: `# Define a Car class
class Car:
    def __init__(self, make, model, year):
        # Initialize attributes
        pass

    def description(self):
        # Return a description of the car
        pass

# Create a car object and print its description

`,
                        solution: `class Car:
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year

    def description(self):
        return f"{self.year} {self.make} {self.model}"

my_car = Car("Toyota", "Camry", 2022)
print(my_car.description())`
                    }
                ]
            }
        }
    };

    // Add content for all other tracks
    if (!content[trackId]) {
        // Generate basic content for missing tracks
        return {
            title: `Module ${moduleId}`,
            content: `
# ${trackId.charAt(0).toUpperCase() + trackId.slice(1)} - Module ${moduleId}

## Welcome to this module!

This is a learning module for the ${trackId} track.

## What you'll learn:
- Core concepts and fundamentals
- Practical applications
- Hands-on exercises

## Let's get started!
Click "Try in Editor" below to practice with code examples.
            `,
            exercises: [
                {
                    title: "Practice Exercise",
                    description: "Try out the concepts you've learned",
                    starterCode: `# Practice exercise for ${trackId}
# Write your code here

print("Hello from ${trackId} module ${moduleId}!")`,
                    solution: `# Sample solution
print("Hello from ${trackId} module ${moduleId}!")
print("This is a basic exercise to get you started.")`
                }
            ]
        };
    }

    return content[trackId]?.[moduleId] || null;
};

export default function ModuleContent() {
    const { trackId, moduleId } = useParams();
    const navigate = useNavigate();
    const [track, setTrack] = useState<any>(null);
    const [module, setModule] = useState<any>(null);
    const [moduleContent, setModuleContent] = useState<any>(null);
    const [currentExercise, setCurrentExercise] = useState(0);
    const [showSolution, setShowSolution] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tracksData = await api.getTracks();
                const foundTrack = tracksData.find((t: any) => t.id === trackId);
                setTrack(foundTrack);
                
                if (foundTrack) {
                    const foundModule = foundTrack.modules.find((m: any) => m.id.toString() === moduleId);
                    setModule(foundModule);
                    
                    // Get learning content
                    const content = getModuleContent(trackId!, moduleId!);
                    setModuleContent(content);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, [trackId, moduleId]);

    if (!track || !module || !moduleContent) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-6 py-8">
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <p>Loading module content...</p>
                    </div>
                </div>
            </div>
        );
    }

    const currentExerciseData = moduleContent.exercises?.[currentExercise];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        className="mb-4"
                        onClick={() => navigate(`/learn/${trackId}`)}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to {track.title}
                    </Button>

                    <div className="flex items-center gap-3 mb-4">
                        <BookOpen className="h-8 w-8 text-primary" />
                        <h1 className="text-3xl font-bold">{moduleContent.title}</h1>
                        <Badge variant="outline">
                            Module {moduleId}
                        </Badge>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Learning Content */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Lightbulb className="h-5 w-5 text-primary" />
                                    Learning Content
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div 
                                    className="prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ 
                                        __html: moduleContent.content.replace(/\n/g, '<br>').replace(/```python(.*?)```/gs, '<pre class="bg-muted p-4 rounded"><code>$1</code></pre>').replace(/`([^`]+)`/g, '<code class="bg-muted px-1 rounded">$1</code>')
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Interactive Exercises */}
                    <div className="space-y-6">
                        {moduleContent.exercises && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Code className="h-5 w-5 text-primary" />
                                        Practice Exercise {currentExercise + 1}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold mb-2">{currentExerciseData.title}</h3>
                                        <p className="text-muted-foreground text-sm mb-4">
                                            {currentExerciseData.description}
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-medium mb-2">Starter Code:</h4>
                                            <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
                                                <code>{currentExerciseData.starterCode}</code>
                                            </pre>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => {
                                                    // Copy starter code and navigate to code editor
                                                    const problem = {
                                                        id: `module-${trackId}-${moduleId}-${currentExercise}`,
                                                        title: currentExerciseData.title,
                                                        description: currentExerciseData.description,
                                                        starterCode: currentExerciseData.starterCode
                                                    };
                                                    localStorage.setItem("selectedProblem", JSON.stringify(problem));
                                                    navigate("/code");
                                                }}
                                            >
                                                <Code className="h-4 w-4 mr-2" />
                                                Try in Editor
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => setShowSolution(!showSolution)}
                                            >
                                                {showSolution ? "Hide" : "Show"} Solution
                                            </Button>
                                        </div>

                                        {showSolution && (
                                            <div>
                                                <h4 className="font-medium mb-2">Solution:</h4>
                                                <pre className="bg-green-50 border border-green-200 p-4 rounded text-sm overflow-x-auto">
                                                    <code>{currentExerciseData.solution}</code>
                                                </pre>
                                            </div>
                                        )}
                                    </div>

                                    {/* Exercise Navigation */}
                                    {moduleContent.exercises.length > 1 && (
                                        <div className="flex justify-between pt-4 border-t">
                                            <Button
                                                variant="outline"
                                                disabled={currentExercise === 0}
                                                onClick={() => {
                                                    setCurrentExercise(currentExercise - 1);
                                                    setShowSolution(false);
                                                }}
                                            >
                                                Previous Exercise
                                            </Button>
                                            <Button
                                                variant="outline"
                                                disabled={currentExercise === moduleContent.exercises.length - 1}
                                                onClick={() => {
                                                    setCurrentExercise(currentExercise + 1);
                                                    setShowSolution(false);
                                                }}
                                            >
                                                Next Exercise
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Module Completion */}
                        <Card className="bg-green-50 border-green-200">
                            <CardContent className="pt-6">
                                <div className="text-center space-y-4">
                                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                                    <div>
                                        <h3 className="font-semibold text-green-800">Complete this module</h3>
                                        <p className="text-green-600 text-sm">
                                            Mark as complete to unlock the next module
                                        </p>
                                    </div>
                                    <Button className="bg-green-600 hover:bg-green-700">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Mark as Complete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
