import * as tf from '../../dist/tfjs.esm';
import { TNetInput } from '../dom/index';
import { WithFaceDetection } from '../factories/WithFaceDetection';
import { WithFaceExpressions } from '../factories/WithFaceExpressions';
import { WithFaceLandmarks } from '../factories/WithFaceLandmarks';
import { ComposableTask } from './ComposableTask';
import { ComputeAllFaceDescriptorsTask, ComputeSingleFaceDescriptorTask } from './ComputeFaceDescriptorsTasks';
import { PredictAllAgeAndGenderTask, PredictAllAgeAndGenderWithFaceAlignmentTask, PredictSingleAgeAndGenderTask, PredictSingleAgeAndGenderWithFaceAlignmentTask } from './PredictAgeAndGenderTask';
export declare class PredictFaceExpressionsTaskBase<TReturn, TParentReturn> extends ComposableTask<TReturn> {
    protected parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>;
    protected input: TNetInput;
    protected extractedFaces?: Array<HTMLCanvasElement | tf.Tensor3D> | undefined;
    constructor(parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>, input: TNetInput, extractedFaces?: Array<HTMLCanvasElement | tf.Tensor3D> | undefined);
}
export declare class PredictAllFaceExpressionsTask<TSource extends WithFaceDetection<{}>> extends PredictFaceExpressionsTaskBase<WithFaceExpressions<TSource>[], TSource[]> {
    run(): Promise<WithFaceExpressions<TSource>[]>;
    withAgeAndGender(): PredictAllAgeAndGenderTask<WithFaceExpressions<TSource>>;
}
export declare class PredictSingleFaceExpressionsTask<TSource extends WithFaceDetection<{}>> extends PredictFaceExpressionsTaskBase<WithFaceExpressions<TSource> | undefined, TSource | undefined> {
    run(): Promise<WithFaceExpressions<TSource> | undefined>;
    withAgeAndGender(): PredictSingleAgeAndGenderTask<WithFaceExpressions<TSource>>;
}
export declare class PredictAllFaceExpressionsWithFaceAlignmentTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends PredictAllFaceExpressionsTask<TSource> {
    withAgeAndGender(): PredictAllAgeAndGenderWithFaceAlignmentTask<WithFaceExpressions<TSource>>;
    withFaceDescriptors(): ComputeAllFaceDescriptorsTask<WithFaceExpressions<TSource>>;
}
export declare class PredictSingleFaceExpressionsWithFaceAlignmentTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends PredictSingleFaceExpressionsTask<TSource> {
    withAgeAndGender(): PredictSingleAgeAndGenderWithFaceAlignmentTask<WithFaceExpressions<TSource>>;
    withFaceDescriptor(): ComputeSingleFaceDescriptorTask<WithFaceExpressions<TSource>>;
}
