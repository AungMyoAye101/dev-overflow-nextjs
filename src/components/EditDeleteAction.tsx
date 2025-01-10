"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { FC } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteQuestion } from "../lib/actions/question.action";
import { deleteAnswer } from "../lib/actions/answer.action";

interface EditDeleteActionProps {
  type: string;
  id: string;
}

const EditDeleteAction: FC<EditDeleteActionProps> = ({ type, id }) => {
  const router = useRouter();
  const path = usePathname();
  const handleEdit = () => {
    router.push(`/question/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      if (type === "question") {
        confirm("Are you sure ");
        await deleteQuestion({
          questionId: id,
          path,
        });
      }

      if (type === "answer") {
        confirm("Are you sure ");
        await deleteAnswer({
          answerId: id,
          path,
        });
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      {type === "question" ? (
        <div className="flex items-center gap-2">
          <button onClick={handleEdit}>
            <FaEdit />
          </button>
          <button className="text-red-500 " onClick={handleDelete}>
            <FaTrashAlt />
          </button>
        </div>
      ) : (
        <button className="text-red-500" onClick={handleDelete}>
          <FaTrashAlt />
        </button>
      )}
    </>
  );
};

export default EditDeleteAction;
