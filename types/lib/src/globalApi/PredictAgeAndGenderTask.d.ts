import * as tf from '../../dist/tfjs.esm';
import { TNetInput } from '../dom/index';
import { WithAge } from '../factories/WithAge';
import { WithFaceDetection } from '../factories/WithFaceDetection';
import { WithFaceLandmarks } from '../factories/WithFaceLandmarks';
import { WithGender } from '../factories/WithGender';
import { ComposableTask } from './ComposableTask';
import { ComputeAllFaceDescriptorsTask, ComputeSingleFaceDescriptorTask } from './ComputeFaceDescriptorsTasks';
import { PredictAllFaceExpressionsTask, PredictAllFaceExpressionsWithFaceAlignmentTask, PredictSingleFaceExpressionsTask, PredictSingleFaceExpressionsWithFaceAlignmentTask } from './PredictFaceExpressionsTask';
export declare class PredictAgeAndGenderTaskBase<TReturn, TParentReturn> extends ComposableTask<TReturn> {
    protected parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>;
    protected input: TNetInput;
    protected extractedFaces?: Array<HTMLCanvasElement | tf.Tensor3D> | undefined;
    constructor(parentTask: ComposableTask<TParentReturn> | Promise<TParentReturn>, input: TNetInput, extractedFaces?: Array<HTMLCanvasElement | tf.Tensor3D> | undefined);
}
export declare class PredictAllAgeAndGenderTask<TSource extends WithFaceDetection<{}>> extends PredictAgeAndGenderTaskBase<WithAge<WithGender<TSource>>[], TSource[]> {
    run(): Promise<WithAge<WithGender<TSource>>[]>;
    withFaceExpressions(): PredictAllFaceExpressionsTask<WithAge<WithGender<TSource>>>;
}
export declare class PredictSingleAgeAndGenderTask<TSource extends WithFaceDetection<{}>> extends PredictAgeAndGenderTaskBase<WithAge<WithGender<TSource>> | undefined, TSource | undefined> {
    run(): Promise<WithAge<WithGender<TSource>> | undefined>;
    withFaceExpressions(): PredictSingleFaceExpressionsTask<WithAge<WithGender<TSource>>>;
}
export declare class PredictAllAgeAndGenderWithFaceAlignmentTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends PredictAllAgeAndGenderTask<TSource> {
    withFaceExpressions(): PredictAllFaceExpressionsWithFaceAlignmentTask<WithAge<WithGender<TSource>>>;
    withFaceDescriptors(): ComputeAllFaceDescriptorsTask<WithAge<WithGender<TSource>>>;
}
export declare class PredictSingleAgeAndGenderWithFaceAlignmentTask<TSource extends WithFaceLandmarks<WithFaceDetection<{}>>> extends PredictSingleAgeAndGenderTask<TSource> {
    withFaceExpressions(): PredictSingleFaceExpressionsWithFaceAlignmentTask<WithAge<WithGender<TSource>>>;
    withFaceDescriptor(): ComputeSingleFaceDescriptorTask<WithAge<WithGender<TSource>>>;
}
