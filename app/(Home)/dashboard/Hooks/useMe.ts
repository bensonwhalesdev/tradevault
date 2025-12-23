import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const ME_QUERY = gql`
  query Me {
    me {
      id
      fullName
      email
      createdAt
    }
  }
`;

interface MeQueryResponse {
  me: {
    id: string;
    fullName: string;
    email: string;
    createdAt: string;
  };
}

export const useMe = () => {
  const { data, loading, error } = useQuery<MeQueryResponse>(ME_QUERY);

  return {
    user: data?.me,
    loading,
    error,
  };
};
