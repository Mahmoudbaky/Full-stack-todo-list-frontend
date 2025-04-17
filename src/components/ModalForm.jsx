import { useRef, useEffect, useState } from "react";

const ModalForm = ({ isModalVisible, onSubmit, todo, onClose }) => {
  const modalRef = useRef(null);

  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (isModalVisible) {
      setInputText(todo.text);
      modalRef.current.showModal();
    } else if (modalRef.current) {
      modalRef.current.close();
    }
  }, [isModalVisible]);

  const handleSubmit = (e) => {
    const updatedTodo = { ...todo, text: inputText };

    e.preventDefault();
    onSubmit(updatedTodo);
    onClose();
  };

  const closeDialog = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <dialog
      id="my_modal_5"
      className="modal modal-bottom sm:modal-middle"
      ref={modalRef}
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">Edit task</h3>
        <form
          method="post"
          className="flex flex-col items-center justify-center p-3 space-x-6"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="block w-full p-3 mb-4 border rounded-full border-grey-light"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="flex self-end gap-4">
            <button className="btn" onClick={closeDialog}>
              cancel
            </button>
            <button className="btn" type="submit">
              save changes
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModalForm;
