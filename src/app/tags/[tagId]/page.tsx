import React from "react";

const page = async ({ params }: { params: Promise<{ tagId: string }> }) => {
  const { tagId } = await params;
  console.log(tagId);
  return (
    <section className="page_padding">
      <div>{tagId}</div>
    </section>
  );
};

export default page;
