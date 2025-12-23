import { gql } from "@apollo/client";
import { useRouter } from "next/navigation"
import Cookies from "js-cookie";;
import { toast } from "sonner";
import { useMutation } from "@apollo/client/react";
import { LoginResponse, LoginVariables } from "../Types/auth";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const useLogin = () => {
  const router = useRouter();
  const [loginMutation, { loading }] = useMutation<
    LoginResponse,
    LoginVariables
  >(LOGIN_MUTATION);

  const loginUser = async (variables: LoginVariables) => {
    try {
      await loginMutation({
        variables,
        onCompleted: (data) => {
          Cookies.set("token", data.login, { expires: 7 });
          toast.success("Welcome back to NexaTrade");
          router.push("/dashboard");
        },
      });
    } catch (err: any) {
      toast.error(err.message || "Invalid email or password.");
    }
  };

  return { loginUser, loading };
};
