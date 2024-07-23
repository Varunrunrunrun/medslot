"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Define the type for props passed to the wrapped component
type ComponentProps = {};

// Define the type for the wrapped component
type WrappedComponentProps = ComponentProps & {};

const withAuth = <P extends WrappedComponentProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();

    const checkIfUserIsAuthenticated = () => {
      return JSON.parse(localStorage.getItem("logged") || "");
    };
    // Replace with your actual authentication check logic
    const isAuthenticated = checkIfUserIsAuthenticated();

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/login"); // Redirect to login if not authenticated
      }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
      // Render the wrapped component if authenticated
      return <WrappedComponent {...(props as P)} />;
    } else {
      // You can return a loading indicator or handle unauthorized access here
      return null;
    }
  };

  return Wrapper;
};

export default withAuth;
