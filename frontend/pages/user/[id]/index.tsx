import React from "react";
import { useRouter } from "next/router";
import { Link } from "@chakra-ui/react";

export default function UserInfo() {
  const router = useRouter();
  const { id } = router.query || "";

  return (
    <>
      <p>user id: {id}</p>
      <Link href="/">home</Link>
    </>
  );
}
