import React from 'react';
import { css } from '@emotion/react';
import { HashLoader  } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
      <HashLoader  css={override} size={65} color={"#123abc"} loading={true} />
    </div>
  );
};

export default Loading;
