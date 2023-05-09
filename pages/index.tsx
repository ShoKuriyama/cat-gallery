import Head from "next/head";
import Image from "next/image";
// import styles from "../styles/Home.module.css";
import styles from "../styles/styles.module.scss";
import React, { useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import "semantic-ui-css/semantic.min.css";
import { Dimmer, Loader, Image as semIm, Segment } from "semantic-ui-react";
// import "semantic-ui-css/semantic.min.css";

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialCatImageUrl: string;
}

// HomePropsを定義して、Homeコンポーネントのプロパティの型を指定します。
interface HomeProps {
  initialCatImageUrl: string;
}

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = await res.json();
  // console.log(result[0]);
  return result[0];
};

export default function Home({ initialCatImageUrl }: HomeProps) {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
    setIsLoading(false);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>ねこ画像アプリ</h1>
      {isLoading ? (
        <Loader active size="huge" />
      ) : (
        <Image src={catImageUrl} alt="" width={500} height={500} />
      )}

      <button className={styles.button} onClick={handleClick}>
        今日のねこさん
      </button>
    </div>
  );
}

// SSR
export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
};
