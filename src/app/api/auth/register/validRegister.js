const validateRegister = (firstName, lastName, email, password) => {
    if (!firstName || !lastName || !email || !password) {
        return { error: "All fields are required" }
    }

    if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
        return { error: "Names can only contain letters" }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { error: "Invalid email format" }
    }

    if (password.length < 8) {
        return { error: "Password must be at least 8 characters long" }
    }

    return { valid: true }

    // should probably check for strong password
}

export default validateRegister