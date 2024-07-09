import dynamic from 'next/dynamic';
import React, { useEffect, useMemo } from 'react';

export const Modal = ({ toggleModal, data }: any) => {
  const Map = useMemo(
    () =>
      dynamic(() => import('./Map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-3">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Modal Title</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => toggleModal()}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div
              className="relative p-6 flex-auto text-black overflow-y-auto"
              style={{ maxHeight: '60vh' }}
            >
              <div className="grid grid-cols-2 gap-2">
                <div>Name:</div>
                <div>{data?.name}</div>
                <div>Email:</div>
                <div>{data?.email}</div>
                <div>Password:</div>
                <div>{data?.password}</div>
                <div>Card ID:</div>
                <div>{data?.card_id}</div>
                <div>Gender:</div>
                <div>{data?.gender ? 'Male' : 'Female'}</div>
                <div>Age:</div>
                <div>{data?.age}</div>
                <div>Address:</div>
                <div>{data?.address}</div>
                <div className="col-span-2 relative">
                  Current Location
                  <Map />
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-700 border border-red-700 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-700 dark:text-red-600"
                type="button"
                onClick={() => toggleModal()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};
