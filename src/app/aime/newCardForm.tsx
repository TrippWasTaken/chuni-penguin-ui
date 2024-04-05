import { NewUser } from "@/types/aime";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { FormEvent, useRef } from "react";

export default function NewCardForm({
  modalRef,
  refresh,
}: {
  modalRef: HTMLDialogElement | null;
  refresh: any;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    await axios
      .post("/api/aime", {
        createNew: true,
        username: form.username.value,
        password: form.password.value,
        confirmPassword: form.confirmPassword.value,
      })
      .then(() => {
        modalRef?.close();
        formRef.current?.reset();
        refresh();
      });
  };
  return (
    <>
      <form onSubmit={(e) => onSubmit(e)} ref={formRef}>
        <div className="flex flex-col gap-5">
          <label className="input input-bordered flex items-center gap-2">
            <UserOutlined /> Username
            <input
              name="username"
              type="text"
              className="grow"
              placeholder="JohnDoe"
              minLength={2}
              maxLength={25}
              pattern="^[A-Za-z0-9]+$"
              title="Username must have no spaces"
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <LockOutlined /> Password
            <input
              name="password"
              type="password"
              className="grow"
              placeholder="*******"
              pattern=".{8,}"
              title="Password must at least 8 characters"
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <LockOutlined /> Re-enter Password
            <input
              name="confirmPassword"
              type="password"
              className="grow"
              placeholder="*******"
              pattern=".{8,}"
              title="Password must at least 8 characters"
              required
            />
          </label>
          <button className="btn btn-outline" type="submit">
            Add
          </button>
        </div>
      </form>
      <div className="modal-action">
        <button className="btn btn-outline btn-secondary">
          Generate code without user
        </button>
        <form method="dialog">
          <button className="btn btn-error">Cancel</button>
        </form>
      </div>
    </>
  );
}
