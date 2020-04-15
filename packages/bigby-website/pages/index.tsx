import Layout from "../src/Layout";
import Markdown from "react-markdown";
import fs from "fs";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (context) => {
  const readme = fs.readFileSync("../bigby/README.md", "utf8").toString();

  return {
    props: { readme },
  };
};

export default ({ readme }) => (
  <Layout>
    <Markdown source={readme} />
  </Layout>
);
