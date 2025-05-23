import {useEffect, useState, type PropsWithChildren} from "react";

const jsonData = {
    userInfo:[
        { key: '姓名', value: '韩涵' },
        { key: '手机号', value: '18582684183' },
        { key: '邮件', value: 'haannn@qq.com' },
        { key: '现居地', value: '四川成都' },
        { key: '出生日期', value: '2000.06.04' },
        { key: 'github', value: 'https://github.com/hanhan9449' },
        { key: '个人博客', value: 'https://next.hanhan9449.top' }
    ],
    userAvatar: 'https://r2-oss.hanhan9449.top/IMG_5722.jpeg'
    ,
    educational: [
        {
            location: '四川-成都',
            university: '成都大学',
            major: '自动化',
            start: '2018.09',
            end: '2022.06',
        }
    ],
    languageAbility: [
        '英语四级',
        '普通话二级乙等'
    ],
    workExperience: [
        {
            location: '四川-成都',
            company: '字节跳动',
            department: '客服平台',
            position: '（实习）前端工程师',
            start: '2021.06',
            end: '2022.06',
            description: '负责前端开发'
        },
        {
            location: '四川-成都',
            company: '字节跳动',
            department: '客服平台',
            position: '前端工程师',
            start: '2021.06',
            end: '2022.06',
            description: '负责前端开发'
        },
        {
            location: '四川-成都',
            company: '字节跳动',
            department: '生活服务-营销',
            position: '前端工程师',
            start: '2021.06',
            end: '2022.06',
            description: '负责前端开发'
        },
    ],
    extraAbility: [],
    selfEvaluation: []
}

type ProfileDataType = typeof jsonData

function Title(props: PropsWithChildren) {
    return <div>{props.children}</div>
}

function UserInfoProfile(props: {
    data: ProfileDataType['userInfo'],
    avatar: ProfileDataType['userAvatar']
}) {
    return <div>
        <Title>个人信息</Title>


    <div style={{position: 'relative', display: 'flex', flexDirection: 'column'}}>
        {props.data.map(it => (
            <div>

            <span>{it.key}</span>
                <span>: </span>
                <span>{it.value}</span>
            </div>
        ))}
        <img src={props.avatar} style={{height: '100%', position: 'absolute', right: 0}}/>
    </div>
    </div>
}
function EducationalProfile(props: {
    data: ProfileDataType['educational']
}) {
    return <div>
        <Title>教育背景</Title>
        <div>
            {props.data.map(it => (
                <div>
                    {it.location} - {it.university} - {it.major}: {it.start} ~ {it.end}
                </div>
            ))}
        </div>

    </div>
}
function LanguageAbilityProfile(props: {
    data: ProfileDataType['languageAbility']
}) {
    return <div>
        <Title>语言能力</Title>
        <div>
            {props.data.map(it => (
                <div>
                    {it}
                </div>
            ))}
        </div>
    </div>
}
function WorkExperienceProfile(props: {
    data: ProfileDataType['workExperience']
}) {
    return <div>
        <Title>工作经历</Title>
    </div>
}
function ExtraAbilityProfile(props: {
    data: ProfileDataType['extraAbility']
}) {
    return <div>
        <Title>个人技能</Title>
    </div>
}
function SelfEvaluationProfile(props: {
    data: ProfileDataType['selfEvaluation']
}) {
    return <div>
        <Title>个人评价</Title>
    </div>
}

export function ReactProfile() {
    const [state, setState] = useState(jsonData)
    useEffect(() => {
    }, [
    ])
    return <div style={{padding: '20px'}}>
        <UserInfoProfile data={state.userInfo} avatar={state.userAvatar} />
        <EducationalProfile data={state.educational} />
        <LanguageAbilityProfile data={state.languageAbility}/>
        <WorkExperienceProfile data={state.workExperience} />
        <ExtraAbilityProfile data={state.extraAbility} />
        <SelfEvaluationProfile data={state.selfEvaluation} />
    </div>
}