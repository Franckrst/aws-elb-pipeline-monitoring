import { Request, Response, NextFunction } from 'express';
import * as AWS from 'aws-sdk'
import {CodePipeline, ELBv2} from "aws-sdk";

const allStatus:
    {[index:string]:any} = {};
export let controller = {
    get: async (req: Request, res: Response, next: NextFunction) => {
        res.json(allStatus);
    },
    getById: (req: Request, res: Response, next: NextFunction) => {
        res.json({ok: true});
    },
    post: (req: Request, res: Response, next: NextFunction) => {
        res.json({ok: true});
    },
    put: (req: Request, res: Response, next: NextFunction) => {
        res.json({ok: true});
    },
    delete: (req: Request, res: Response, next: NextFunction) => {
        res.json({ok: true});
    },
};


const addState = (env: string, key: string,states: {[index:string]:{status : boolean}}) => {
    if(!allStatus[env]){allStatus[env] = {}}
    if(!allStatus[env][key]){allStatus[env][key] = {}}
    for(let stateKey in states){
        if(!allStatus[env][key][stateKey]){allStatus[env][key][stateKey] = []}
        allStatus[env][key][stateKey].push(states[stateKey]);
        allStatus[env][key][stateKey] = allStatus[env][key][stateKey].slice(-15);
    }
};
/*
   CRON
 */
const INTERVAL = 60 * 1000;
let CRON = async () => {
    // ----------------------------------- PIPELINE ------------------------------------------------------------------------
    const pipeLine = async ()=> {
        const pipeLinesStatus: {[index:string]:{status : boolean}} = {};
        const datapipeline = new AWS.CodePipeline();
        const data: CodePipeline.Types.ListPipelinesOutput = await new Promise((res, rej) => datapipeline.listPipelines({}, (e, d) => e ? rej(e) : res(d)));
        for (let pipe of data.pipelines) {
            await new Promise((res, rej) => datapipeline.getPipelineState({name: pipe.name}, (e, d) => e ? rej(e) : res(d))).then((pipeDetailsData: CodePipeline.Types.GetPipelineStateOutput) =>
                pipeLinesStatus[pipe.name] = {
                    status: Object.keys(pipeDetailsData.stageStates).every((key) =>
                        pipeDetailsData.stageStates[key].latestExecution.status === "Succeeded"
                    )
                }
            ).catch(() => pipeLinesStatus[pipe.name] = {status: false});
        }
        console.log("UPDATE pipeLines");
        return pipeLinesStatus;
    };
    // ----------------------------------- ECS TARGET ------------------------------------------------------------------------
    const target = async () => {
        const healtStatus: {[index:string]:{status : boolean}} = {};
        const elbv2 = new AWS.ELBv2();
        await new Promise((res, rej) => elbv2.describeTargetGroups((e, d) => e ? rej(e) : res(d))).then(async (elb: ELBv2.Types.DescribeTargetGroupsOutput) => {
            for (let target of elb.TargetGroups) {
                await new Promise((res, rej) => elbv2.describeTargetHealth({TargetGroupArn: target.TargetGroupArn}, (e, d) => e ? rej(e) : res(d)))
                    .then((healt : ELBv2.Types.DescribeTargetHealthOutput) => {
                        if(healt.TargetHealthDescriptions.length === 0) return;
                        healtStatus[target.TargetGroupName] = {status : healt.TargetHealthDescriptions.every((data)=>data.TargetHealth.State==='healthy')};
                    }).catch(()=>healtStatus[target.TargetGroupName] = { status : false } );
            }
        });
        console.log("UPDATE targetGroups");
        return healtStatus;
    };

    AWS.config.loadFromPath('./config/aws-prod.json');
    await Promise.all([
        target().then((data)=>{addState('prod','targetGroups', data)}),
        pipeLine().then((data)=>{addState('prod','pipeLines', data)})
    ]);
    AWS.config.loadFromPath('./config/aws-preprod.json');
    await Promise.all([
        target().then((data)=>{addState('preprod','targetGroups', data)}),
        pipeLine().then((data)=>{addState('preprod','pipeLines', data)})
    ]);

};
CRON();
setInterval(CRON, INTERVAL);
