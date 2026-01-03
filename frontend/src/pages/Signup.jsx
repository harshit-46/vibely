import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Signup() {
    const { user, loading, signup } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    // ⏳ Wait for auth check
    if (loading) return null;

    // 🔁 If already logged in → redirect
    if (user) {
        return <Navigate to="/feed" replace />;
    }

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        if (errors[e.target.name]) {
            setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
        }
        setServerError("");
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            newErrors.username = "Only letters, numbers & underscores allowed";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setIsSubmitting(true);
            setServerError("");

            await signup({
                name: formData.name,
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

        } catch (err) {
            setServerError(
                err?.response?.data?.message || "Signup failed. Try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Create Account
                    </h1>
                    <p className="text-zinc-400 text-sm">Join Vibely today</p>
                </div>

                {/* Card */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Server error */}
                        {serverError && (
                            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                                {serverError}
                            </div>
                        )}

                        {/* Name */}
                        <input
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white"
                        />
                        {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}

                        {/* Username */}
                        <input
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white"
                        />
                        {errors.username && (
                            <p className="text-red-400 text-xs">{errors.username}</p>
                        )}

                        {/* Email */}
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-xs">{errors.email}</p>
                        )}

                        {/* Password */}
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white"
                        />
                        {errors.password && (
                            <p className="text-red-400 text-xs">{errors.password}</p>
                        )}

                        {/* Confirm */}
                        <input
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-400 text-xs">
                                {errors.confirmPassword}
                            </p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg"
                        >
                            {isSubmitting ? "Creating account..." : "Create Account"}
                        </button>
                    </form>
                </div>

                {/* Login link */}
                <p className="text-center text-zinc-400 text-sm mt-6">
                    Already have an account?{" "}
                    <Link to="/" className="text-blue-500 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
