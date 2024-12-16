import { useRef, useEffect, useState } from "react";

const ModalForm = ({ isModalVisible, onSubmit, todo, onClose }) => {
  const modalRef = useRef(null);

  const [inputText, setInputText] = useState("");

  // console.log(todo.text);

  useEffect(() => {
    console.log("Dialog visibility changed:", isModalVisible);
    if (isModalVisible) {
      setInputText(todo.text);
      modalRef.current.showModal();
    } else if (modalRef.current) {
      modalRef.current.close();
    }
  }, [isModalVisible, todo]);

  const handleSubmit = (e) => {
    console.log(todo);
    e.preventDefault();
    onSubmit({ ...todo, inputText });
    onClose();
  };

  return (
    <dialog
      id="my_modal_5"
      className="modal modal-bottom sm:modal-middle"
      ref={modalRef}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit task</h3>
        <form
          method="post"
          className="p-3 flex justify-between space-x-6"
          onSubmit={handleSubmit}
        >
          <input
            className="block border border-grey-light w-full p-3 rounded-full mb-4"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="btn" type="submit">
            save changes
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default ModalForm;
