"use client";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useToast } from "../hooks/use-toast";

interface EditDeleteActionProps {
  type: string;
  id: string;
}

const EditDeleteAction: FC<EditDeleteActionProps> = ({ type, id }) => {
  const router = useRouter();
  const { toast } = useToast();
  const handleEdit = () => {
    router.push(`/question/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      if (!confirm("Are you sure?")) return;

      if (type === "question") {
        await fetch(`/api/questions/${id}`, {
          method: "DELETE",
        });
      }

      if (type === "answer") {
        await fetch(`/api/answers/${id}`, {
          method: "DELETE",
        });
      }
      toast({
        title: `You deleted ${type} `,
        variant: "default",
      });
      if (type === "question") {
        router.push("/");
      } else {
        router.refresh();
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
