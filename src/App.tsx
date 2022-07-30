import { useState } from "react";
import { LoadingOverlay, Loader } from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";

function App() {
  const [dropActive, setDropActive] = useState<boolean>(true);
  const [stateFiles, setFiles] = useState<File[]>();

  const onDropHandler = (files: File[]) => {
    setFiles(files);
    setDropActive(false);
    console.group("FileProvider");
    console.log(files);
    files.map((file) => console.log(file.name));
    console.groupEnd();
  };
  const reChoiceFileDandD = () => {
    setDropActive(true);
    setFiles(undefined);
  };

  return (
    <div className="container">
      <h3 className="mx-4 my-8 text-4xl font-bold">
        Please csv file is drag & drop
      </h3>
      {stateFiles && stateFiles.length && (
        <div className="m-6">
          <div className="flex items-center my-4">
            <p className="text-xl">Your drop files</p>
            {dropActive === false && (
              <button
                type="button"
                className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ml-4"
                onClick={reChoiceFileDandD}
              >
                ファイルを選び直す
              </button>
            )}
          </div>

          <ul className="mx-4">
            {stateFiles.map((file) => (
              <li>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      <Dropzone.FullScreen
        active={dropActive}
        onDrop={onDropHandler}
        accept={["text/csv"]}
      >
        <p>please drop</p>
        <Dropzone.Accept>
          <p>ドロップしてください</p>
        </Dropzone.Accept>
        <Dropzone.Reject>
          <p>CSVファイルのみインポートすることができます</p>
        </Dropzone.Reject>
        <Dropzone.Idle>
          <LoadingOverlay visible={true} />
        </Dropzone.Idle>
      </Dropzone.FullScreen>
    </div>
  );
}

export default App;
