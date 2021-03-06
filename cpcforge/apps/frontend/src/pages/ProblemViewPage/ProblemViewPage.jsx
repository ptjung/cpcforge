import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import AceEditor from "react-ace-editor";
import { GiCheckMark } from 'react-icons/gi';
import { BsXLg } from 'react-icons/bs';
import 'brace/mode/python';
import 'brace/theme/monokai';
import { Page } from '../../common';
import { api } from '../../utils';
import styles from './ProblemViewPage.module.scss';

const aceEditorStyling = {
    'height': '650px',
    'width': 'unset',
    'fontSize': '14px',
    'borderRadius': '4px',
    'borderTop': '10px solid white'
};

const aceEditorOptions = {
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: false,
    enableSnippets: false,
    showLineNumbers: true,
    tabSize: 2,
};

function ProblemViewPage() {
    const [writtenCode, setWrittenCode] = useState('');
    const [username, setUsername] = useState('');
    const [passCnt, setPassCnt] = useState(0);
    const [wrongCnt, setWrongCnt] = useState(0);

    const [probName, setProbName] = useState('');
    const [probDescrptn, setProbDescrptn] = useState('');

    const { handle: pltHandle, probHandle } = useParams();

	useEffect(async () => {
        // const tokenStatus = await getTokenStatus();
		// if (!tokenStatus?.['verified']) navigate("/login");
        // const pltTokenStatus = await getPlatformTokenStatus(pltHandle);
        // if (!pltTokenStatus?.['verified']) navigate("/list");
        // setUsername(tokenStatus?.['payload']['username']);

        // // Find problem props
        // const res = await api.post('/api/platforms/retrieve', { handle: pltHandle });
        // if (res.data.hasOwnProperty('result')) {
        //     const problems = res.data['result']['problems'];
        //     const prob = problems.find(prob => prob['handle'] === probHandle);
        //     if (!!prob) {
        //         setProbName(prob['name']);
        //         setProbDescrptn(prob['description']);
        //     }
        // }
	}, []);

    const handleCodeSubmit = async () => {
        const codeSubmitNode = document.getElementById("code_submit");
        codeSubmitNode.disabled = true;
        setTimeout(() => {
            codeSubmitNode.disabled = false;
        }, 3000);
        const submitDataOut = await api.post('/api/problems/submit', {
            username: username,
            pltHandle: pltHandle,
            probHandle: probHandle,
            writtenCode: writtenCode
        }).then(res => res.data).catch(err => {
            return { 'status': 'fail' };
        });
        if ( submitDataOut['status'] === 'success' ) {
            const { pass: passCnt, no_pass: wrongCnt } = submitDataOut['result'];
            setPassCnt(passCnt);
            setWrongCnt(wrongCnt);
            console.log(passCnt, wrongCnt)
        }
    };

    return (
        <Page>
            <div className={styles['problem-box-wrapper']}>
                <div className={styles['problem-statement']}>
                    <h1>{probName}</h1>
                    <hr />
                    {/* <MDEditor.Markdown source={probDescrptn} /> */}
                </div>
                <div className={styles['feedback-container']}>
                    <div className={styles['editor-wrapper']}>
                        <AceEditor
                        mode="python"
                        theme="xcode"
                        style={aceEditorStyling}
                        onChange={setWrittenCode}
                        setOptions={aceEditorOptions}
                        />
                    </div>
                    <div className={styles['submit-test-container']}>
                        <div>
                            <button id="code_submit" type="submit" onClick={handleCodeSubmit}>Submit</button>
                        </div>
                        <div>
                            {[...Array(passCnt)].map((_, i) => <GiCheckMark key={`pass-${i}`} />)}
                            {[...Array(wrongCnt)].map((_, i) => <BsXLg key={`nopass-${i}`} />)}
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default ProblemViewPage;