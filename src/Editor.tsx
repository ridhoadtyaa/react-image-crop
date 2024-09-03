import React, { useEffect, useState } from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './editor.css'

const MyEditor: React.FC = () => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
		return () => {
			setIsMounted(false)
		}
	}, [])

	const onEditorStateChange = (newState: EditorState) => {
		setEditorState(newState)
	}

	return (
		<div>
			{isMounted && (
				<Editor
					editorState={editorState}
					onEditorStateChange={onEditorStateChange}
					wrapperClassName="editor-wrapper"
					editorClassName="editor-content"
					toolbarClassName="editor-toolbar"
					toolbar={{
						options: ['blockType', 'inline', , 'fontSize', 'list', 'textAlign', 'link', 'emoji', 'remove', 'history'],
						blockType: { inDropdown: true, options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'] },
						inline: { inDropdown: false, options: ['bold', 'italic', 'underline', 'strikethrough'] },
						list: { inDropdown: false, options: ['unordered', 'ordered'] },
						textAlign: { inDropdown: false },
						link: { inDropdown: false },
						history: { inDropdown: false },
					}}
				/>
			)}
		</div>
	)
}

export default MyEditor
