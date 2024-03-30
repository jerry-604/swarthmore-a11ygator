import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import NoResults from './NoResults';

type CourseItem = {
  name: string;
  type?: 'coursefolder';
  children?: CourseItem[];
};

interface HomeProps {
    data: CourseItem[];
    setSelectedKey: (key: string) => void;
  }

const Home: React.FC<HomeProps> = ({ data, setSelectedKey }) => {
const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setSelectedKey(entry.target.getAttribute("data-index") || '');
          }
        });
      },
      { rootMargin: '0px', threshold: 0.1 }
    );
  
    sectionRefs.current.forEach((section, index) => {
      if (section) {
        observer.observe(section);
      }
    });
  
    return () => {
      sectionRefs.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [data, setSelectedKey]);
  


    return (
    <div className="p-5">
        {data.length !== 0 && (
        <h1 className="text-center text-2xl font-bold mb-10 dark:text-white">Welcome to the Swarthmore A11yGator!</h1>
        )}

        {data.length !== 0 && (
        <p className="text-center mb-10 dark:text-white">Explore accessible course documents and enhance your learning experience.</p>
        )}

        {data.length === 0 ? (
        <div className="flex justify-center items-center h-[calc(100vh-163px)]">
            <NoResults description="No search results found" />
        </div>
        ) : (
        data.map((course, index) => (
            // Adjusted for .course
            <div ref={el => sectionRefs.current[index] = el} data-index={(index+1).toString()}  key={index}tabIndex={0} aria-label={`${course.name} course-folder`} className="mt-12 mb-5 p-5 bg-white border border-gray-500 shadow-xl rounded-lg" id={course.name}>
            <h2  className="bg-orange-200 text-center text-lg font-semibold py-3">{course.name}</h2>

            {course.children?.map((item, subIndex) => (
                <div key={subIndex} className="ml-5 my-5">
                {item.type === 'coursefolder' ? (
                    <div className="my-5">
                    <h3 id={item.name} className="font-medium">{item.name}</h3>

                    {item.children?.map((file, fileIndex) => (
                        file.name.endsWith('.html') && (
                        <Link href={`/${course.name}/${item.name}/${file.name}`} key={fileIndex} legacyBehavior>
                            <a id={file.name} className="block ml-5 mt-2 text-blue-800 hover:text-blue-600 hover:underline">{file.name}</a>
                        </Link>
                        )
                    ))}
                    </div>
                ) : (
                    // Enhancing link visibility for single files
                    <Link href={`/${course.name}/${item.name}`} legacyBehavior>
                    <a className="block ml-5 mt-2 text-blue-800 hover:text-blue-600 hover:underline">{item.name}</a>
                    </Link>
                )}
                </div>
            ))}
            </div>
        ))
        )}
    </div>
    );
              }

export default Home;

