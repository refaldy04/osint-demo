import { Modal } from '@/components/Modal';
import supabase from '@/config/supabase';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [allTargets, setAllTargets] = useState<any>([]);
  const [target, setTarget] = useState({});
  const [targets, setTargets] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getTarget = async (id: number) => {
    const { data, error } = await supabase.from('target').select().eq('id', id);
    if (error) {
      console.error('Error fetching data:', error.message);
    } else {
      setTarget(data[0]);
    }
  };

  const getTargets = async () => {
    const { data, error } = await supabase.from('target').select();
    if (error) {
      console.error('Error fetching data:', error.message);
    } else {
      setAllTargets(data);
    }
  };

  const getTargetByName = async (name: string) => {
    const { data, error } = await supabase
      .from('target')
      .select()
      .ilike('name', `%${name}%`);
    if (error) {
      console.error('Error fetching data:', error.message);
    } else {
      setTargets(data);
    }
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
    };

    getTargetByName(target.name.value);
  };

  useEffect(() => {
    getTargets();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className="bg-osint-bg flex flex-col items-center gap-5 pt-52 pb-4 min-h-screen">
          {/*  */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-2 lg:w-1/3"
          >
            <input
              name="name"
              type="text"
              placeholder="input target name"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
            />
            <button
              type="submit"
              className="text-gray-900 hover:text-white border border-gray-800 focus:outline-none font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2 dark:border-white dark:text-white"
            >
              Search
            </button>
          </form>

          <div className="w-full">
            {targets.length > 0 && (
              <>
                <hr />
                <div className="text-2xl text-center font-semibold my-4">
                  Targets
                </div>

                <div className="grid lg:grid-cols-3 px-10 gap-5">
                  {targets.map((target: any) => (
                    <div
                      onClick={() => {
                        getTarget(target.id);
                        toggleModal();
                      }}
                      key={target.id}
                      className="flex flex-col items-center justify-center border border-white bg-white text-black py-2 rounded-lg shadow-md mb-2 cursor-pointer"
                    >
                      <p>{target.name}</p>
                      <p>{target.email}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
            {targets?.length < 1 && (
              <div className="text-2xl text-center mt-5">No data</div>
            )}

            {showModal && <Modal toggleModal={toggleModal} data={target} />}
          </div>
        </div>

        {/* <div className="flex flex-col justify-center items-center gap-7 lg:pt-10">
          <h1 className="text-2xl font-semibold">All Targets</h1>
          <div className="grid grid-cols-3 gap-5 w-full px-10">
            {allTargets?.map((task: any) => (
              <div
                key={task.id}
                className="flex flex-col items-center justify-center border border-white bg-slate-400 bg-opacity-15 p-4 rounded-lg shadow-md mb-2"
              >
                <Link href={`/target/${task.name}`}>{task.name}</Link>
                <Link href={`/target/${task.name}`}>{task.email}</Link>
              </div>
            ))}
          </div>
        </div> */}
      </div>
      <Head>
        <title>Osint Project</title>
      </Head>
    </>
  );
}
