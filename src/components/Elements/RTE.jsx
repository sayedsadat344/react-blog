import React from 'react'

import { Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full'>
      {
        label && <label className='block text-sm font-medium text-slate-700 mb-1' >{label}</label>
      }


      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor 
         apiKey='2k25tm7qz4l4pevnlkis7xvanvyeyk42ncjeuwzo43cejtp6'
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 400,
              width: "100%", 
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
          />
        )}
      />

    </div>
  )
}