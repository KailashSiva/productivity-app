
// Function that runs when the form is submitted
const onSubmit = async (data) => {
    setServerError(''); // Clear any previous errors

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
            router.push('/login'); // Redirect to login after successful registration
        } else {
            setServerError(result.message || 'Registration failed'); // Handle server errors
        }
    } catch (error) {
        setServerError('Something went wrong. Please try again.');
    }
};