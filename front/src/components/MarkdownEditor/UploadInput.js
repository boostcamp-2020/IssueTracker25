import React from 'react';
import styled from 'styled-components';

const fileAccepts = [
  '.gif',
  '.jpeg',
  '.jpg',
  '.png',
  '.docx',
  '.gz',
  '.log',
  '.pdf',
  '.pptx',
  '.txt',
  '.xlsx',
  '.zip',
];

const UploadInputContainer = styled.div`
  background: inherit;
`;

const Label = styled.label`
  position: relative;
  display: block;
  width: 100%;
  padding: 7px 10px;
`;

const Input = styled.input`
  width: 100%;
  min-height: 0;
  opacity: 0.01;
  position: absolute;
  cursor: pointer;
`;

const UploadInput = () => {
  return (
    <UploadInputContainer>
      <Label htmlFor="input-upload">
        <Input name="input-upload" accept={fileAccepts.join(',')} type="file" />
        <span>Attach files by selecting here</span>
      </Label>
    </UploadInputContainer>
  );
};

export default UploadInput;
