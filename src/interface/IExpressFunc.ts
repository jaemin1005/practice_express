import { Request, Response, NextFunction } from 'express';

type IExpressFunc = (req : Request, res : Response, next : NextFunction) => void;
type IExpressErrorFunc = (err : Error, req : Request, res : Response, next : NextFunction) => void;