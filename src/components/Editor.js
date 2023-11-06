import React, { useState } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';

export default function Editor(props) {
  const { language, displayName, value, onChange } = props;
  const [open, setOpen] = useState(true);
  const [readOnly, setReadOnly] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(value);
    // alert(`Copied ${displayName} to clipboard`);
  }

  function handleSave() {
    // alert(`Saved ${displayName}`);
  }

  function handleLockUnlock() {
    setReadOnly((prevReadOnly) => !prevReadOnly);
    // alert(`Editor ${readOnly ? 'Unlocked' : 'Locked'}`);
  }

  function handleChange(editor, data, value) {
    onChange(value);
  }

  return (
    <div className={`editor-container ${open ? '' : 'collapsed'} ${readOnly ? 'read-only' : ''}`}>
      <div className="editor-title">
        {displayName}
        <div className="buttons-container">
          <button
            type="button"
            className="expand-collapse-btn"
            onClick={() => setOpen(prevOpen => !prevOpen)}
          >
            <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
          </button>
          <button type="button" onClick={handleCopy} className="expand-collapse-btn">
            Copy
          </button>
          <button type="button" onClick={handleSave} className="expand-collapse-btn">
            Save
          </button>
          <button type="button" onClick={handleLockUnlock} className="expand-collapse-btn">
            {readOnly ? 'Unlock' : 'Lock'}
          </button>
        </div>
      </div>

      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
          lineNumbers: true,
          autoIndent: true,
          readOnly: readOnly,
        }}
      />
    </div>
  );
}
