import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import cheerio from 'cheerio';
import Head from 'next/head';
import { Typography, Breadcrumbs, Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Link from 'next/link';

const HTMLViewer = () => {
  const [content, setContent] = useState<string>('');
  const [pageTitle, setPageTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { course, courseFolder, fileName } = router.query as { course: string; courseFolder?: string; fileName: string; };

  useEffect(() => {
    if (!router.isReady) return;
    setLoading(true); // Start loading

    const url = courseFolder
      ? `https://pub-0406c68e752f4eed89ba40aeef7732ed.r2.dev/${course}/${courseFolder}/${fileName}`
      : `/data/${course}/${fileName}`;

    axios.get(url)
    .then((res) => {
        const fetchedContent = res.data;
        const $ = cheerio.load(fetchedContent);
    
        // Modify each image's src attribute
        $('img').each(function () {
            const oldSrc = $(this).attr('src');
            const newSrc = `https://pub-0406c68e752f4eed89ba40aeef7732ed.r2.dev/${course}/${courseFolder}/${oldSrc}`;
            $(this).attr('src', newSrc);
        });
    
        const title = $('title').text();
        setPageTitle(title);
        $('title').remove();
        setContent($.html());
        setLoading(false);
    })
      .catch((err) => {
        console.error(err);
        setContent('<p class="text-red-500 dark:text-red-300">Sorry, an error occurred while loading the content.</p>');
        setLoading(false); 
      });
  }, [router.isReady, course, courseFolder, fileName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-white">
        <div className="spinner " />
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 dark:bg-slate-800 border border-gray-400 dark:border-gray-600 shadow-2xl m-8 rounded-lg" tabIndex={0} aria-label="HTML content viewer">
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Breadcrumbs aria-label="breadcrumb" className="mb-4 text-gray-800 dark:text-gray-200">
        <Link legacyBehavior href="/" passHref>
          <a className="flex items-center dark:text-[#22d3ee] hover:text-gray-600 dark:hover:text-gray-400"><HomeIcon /></a>
        </Link>
        <Link legacyBehavior href={`/#${course}`} passHref>
        <a className="text-blue-600 dark:text-[#22d3ee] hover:text-blue-800 dark:hover:text-blue-300">{course}</a>
        </Link>
        {courseFolder && (
          <Link legacyBehavior href={`/#${courseFolder}`} passHref>
            <a className="text-blue-600 dark:text-[#22d3ee] hover:text-blue-800 dark:hover:text-blue-300">{courseFolder}</a>
          </Link>
        )}
        <Typography color="textPrimary" className="text-gray-800 dark:text-gray-200">{fileName}</Typography>
      </Breadcrumbs>

      <Box
    dangerouslySetInnerHTML={{ __html: content }}
    className="html-content text-gray-900 dark:text-gray-100"
  />

      <Button
        startIcon={<ArrowBackIosIcon />}
        onClick={() => router.push(`/#${courseFolder || course}`)}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white"
        aria-label="Go back"
      >
        Go Back
      </Button>
    </div>
  );
};

export default HTMLViewer;
