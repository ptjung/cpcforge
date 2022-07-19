import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FileUploader } from "react-drag-drop-files";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { Page } from '../../common';
import { api } from '../../utils';
import styles from './ProblemCreatePage.module.scss';

const TEST_CASE_FILE_TYPES = ["TXT"];

const EXAMPLE_MKDOWN = `
You will receive two numbers \`N\` and \`K\`. If \`N\` is greater than \`K\`, print \`Yes\`, otherwise, print \`No\`.

<h2>Example</h2>

Input:
\`\`\`
4
5
\`\`\`

Expected Output:
\`\`\`
No
\`\`\`
`.trim()

const PreviewStyled = styled.div`
    .mde-preview {
        font-family: monospace;
        background-color: white;
        max-width: 505px;
    }
`;

const FileUploadStyled = styled.div`
    label {
        width: 100px;
        height: 60px;
        min-width: 100px;
        padding: 40px 0 0 0;
        margin-right: 20px;
        border: 4px dashed #5f5f5f;
        margin-top: 3em;
        text-align: center;
    }
`;

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

function ProblemCreatePage() {
    const [probDesc, setProbDesc] = useState(EXAMPLE_MKDOWN);
    const [ioFileError, setIoFileError] = useState("");
    const [testCasesIn, setTestCasesIn] = useState([]);
    const [testCasesOut, setTestCasesOut] = useState([]);
    const [selectedTab, setSelectedTab] = useState("write");

    const [username, setUsername] = useState('');
    // const navigate = useNavigate();
    const pltHandle = 'rcpc';

	useEffect(async () => {
        // const tokenStatus = await getTokenStatus();
		// if (!tokenStatus?.['verified']) navigate("/login");
        // const pltTokenStatus = await getPlatformTokenStatus(pltHandle);
        // if (!pltTokenStatus?.['verified']) navigate("/list");
        // setUsername(tokenStatus?.['payload']['username']);
	}, []);

    const probcreateInitValues = {
        name: '',
        handle: '',
    };
    
    const probcreateValidate = async (values) => {
        const errors = {};
    
        /* This block validates the problem name field */
        const inName = values.name.trim();
        if (!inName) {
            errors.name = 'Required';
        }
        else if (!/^[\x00-\x7F]{1,100}$/i.test(inName)) {
            errors.name = 'Invalid problem name: must consist of 1 to 100 ASCII characters';
        }

        /* This block validates the problem handle field */
        const inHandle = values.handle.trim();
        if (!inHandle) {
            errors.handle = 'Required';
        }
        else if (!/^[A-Za-z0-9]{1,36}$/i.test(inHandle)) {
            errors.handle = 'Invalid handle: must consist of 1 to 36 alphanumerical characters';
        }
        else {
            // Check if platform handle is already taken
            const res = await api.post('/api/platforms/retrieve', { handle: pltHandle });
            if (res.data.hasOwnProperty('result')) {
                const problems = res.data['result']['problems'];
                if (!!problems.find(prob => prob['handle'] === inHandle)) {
                    errors.handle = 'This handle has already been taken';
                }
            }
        }

        /* This block validates the I/O files */
        if (testCasesIn.length !== testCasesOut.length) {
            errors.iofiles = 'Invalid I/O files: number of inputs must match number of outputs';
            setIoFileError(errors.iofiles);
        }
        else if (testCasesIn.length === 0) {
            errors.iofiles = 'Invalid I/O files: at least one test case (input-output file pair) must be created';
            setIoFileError(errors.iofiles);
        }
    
        // For form errors
        return errors;
    };
    
    const probcreateSubmitEvent = async (values, actions) => {
        /* This block registers the new platforms's data via the API */
        const platformVals = {
            platform: pltHandle,
            name: values.name.trim(),
            handle: values.handle.trim(),
            description: probDesc,
            author: username,
            testCasesIn: testCasesIn,
            testCasesOut: testCasesOut
        };
        await api.post('/api/problems/create', platformVals)
            .then(res => {})
            .catch(err => {});

        // Navigate
        actions.resetForm(probcreateInitValues);
        // navigateAndRefresh(`/platform/${pltHandle}`);
    };

    const storeFileContent = (file, mode) => {
        // mode: describes whether this is an input (false) or output (true) file
        const handleFileRead = _ => {
            const content = fileReader.result;
            if (mode === false) {
                setTestCasesIn(curr => [...curr, content]);
            }
            else {
                setTestCasesOut(curr => [...curr, content]);
            }
        };
        const fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

    return (
        <Page>
            <div className={styles['probcreate-box-wrapper']}>
                <Formik
                initialValues={probcreateInitValues}
                validate={probcreateValidate}
                validateOnChange={false}
                onSubmit={probcreateSubmitEvent}
                >
                    <>
                        <div className={styles['probcreate-box']}>
                            <div className={styles['site-label']}>Create a Problem</div>
                            <Form className={styles['form-container']}>
                                <label htmlFor="name">Problem Name *</label>
                                <div className={styles['field-container']}>
                                    <Field id="name" name="name" />
                                    <span><ErrorMessage name="name" /></span>
                                </div>

                                <label htmlFor="handle">Handle *</label>
                                <div className={styles['field-container']}>
                                    <Field id="handle" name="handle" />
                                    <span><ErrorMessage name="handle" /></span>
                                </div>

                                <label htmlFor="description">Problem Statement</label>
                                <PreviewStyled>
                                    <ReactMde
                                    value={probDesc}
                                    onChange={setProbDesc}
                                    selectedTab={selectedTab}
                                    onTabChange={setSelectedTab}
                                    minEditorHeight={300}
                                    maxEditorHeight={300}
                                    minPreviewHeight={300}
                                    generateMarkdownPreview={markdown =>
                                        Promise.resolve(converter.makeHtml(markdown))
                                    }/>
                                </PreviewStyled>
                                <div className={styles['form-bottom']}>
                                    <button type="submit">Create</button>
                                </div>
                            </Form>
                        </div>
                        <div className={styles['probcreate-box']}>
                            <div className={styles['site-label']}>Test Cases</div>
                            <p>
                                Note: select one <i>.TXT</i> file at a time when adding them respectively into the categories below.
                                <br />< br/>
                                As a guideline, the <i>n</i> th input corresponds with the <i>n</i> th output.
                            </p>
                            <Form className={styles['form-container']}>
                                <div className={styles['file-upload-wrapper']}>
                                    <FileUploadStyled>
                                        <FileUploader
                                        handleChange={f => storeFileContent(f, false)}
                                        name="file"
                                        types={TEST_CASE_FILE_TYPES}
                                        label={" "}
                                        >
                                            <div className='file-uploader'>
                                                Input #{testCasesIn.length + 1}
                                            </div>
                                        </FileUploader>
                                    </FileUploadStyled>
                                    <FileUploadStyled>
                                        <FileUploader
                                        handleChange={f => storeFileContent(f, true)}
                                        name="file"
                                        types={TEST_CASE_FILE_TYPES}
                                        label={" "}
                                        >
                                            <div className='file-uploader'>
                                                Output #{testCasesOut.length + 1}
                                            </div>
                                        </FileUploader>
                                    </FileUploadStyled>
                                </div>
                                <div className={styles['field-container']}>
                                    <span>{ioFileError}</span>
                                </div>
                            </Form>
                        </div>
                    </>
                </Formik>
            </div>
        </Page>
    );
}

export default ProblemCreatePage;