import { useRouter } from "next/navigation";

const useNavigation = () => {
  const router = useRouter();

  const navigate = (page: string, replace: boolean = false) =>
    replace ? router.replace(page) : router.push(page);

  const back = () => router.back();

  return { navigate, back };
};

export { useNavigation };
