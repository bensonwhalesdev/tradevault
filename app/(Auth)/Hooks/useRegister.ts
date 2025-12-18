import { gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; 
import { useMutation } from "@apollo/client/react";
import { RegisterResponse, RegisterVariables } from "../Types/auth";

const REGISTER_MUTATION = gql`
 mutation Register($email: String!, $password: String!, $fullName: String!) {
    register(email: $email, password: $password, fullName: $fullName) {
      id
      email
      fullName
    }
  }
`
 


export const useRegister = () => {
  const router = useRouter();
  const [registerMutation, { loading }] = useMutation<RegisterResponse, RegisterVariables>(
    REGISTER_MUTATION
  );

  const registerUser = async (variables: RegisterVariables) => {
    try {
      await registerMutation({
        variables,
        onCompleted: () => {
          toast.success("Account created successfully!");
          router.push("/login");
        },
      });
    } catch (err: any) {
      // Catch the 'Email already in use' error from your resolver
      toast.error(err.message || "Registration failed. Please try again.");
    }
  };

  return { registerUser, loading };
};