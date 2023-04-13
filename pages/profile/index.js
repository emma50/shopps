import { getSession } from "next-auth/react";
import Layout from "../../components/profile/layout";

export default function Profile({ user, tab }) {
  return (
    <Layout session={user.user} tab={tab}>Layout</Layout>
  )
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });

  const tab = Number(query.tab) || 0;

  return {
    props: { user: session, tab },
  };
}
