declare module 'three/examples/jsm/postprocessing/EffectComposer' {
    export class EffectComposer {
        constructor(renderer: any, renderTarget?: any);
        readBuffer: any;
        writeBuffer: any;
        renderTarget1: any;
        renderTarget2: any;
        renderToScreen: boolean;
        passes: any[];
        copyPass: any;
        setSize(width: number, height: number): void;
        addPass(pass: any): void;
        insertPass(pass: any, index: number): void;
        removePass(pass: any): void;
        render(deltaTime?: number): void;
        reset(renderTarget?: any): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/RenderPass' {
    export class RenderPass {
        constructor(scene: any, camera: any, overrideMaterial?: any, clearColor?: any, clearAlpha?: any);
        scene: any;
        camera: any;
        overrideMaterial: any;
        clearColor: any;
        clearAlpha: any;
        clear: boolean;
        needsSwap: boolean;
        renderToScreen: boolean;
    }
}

declare module 'three/examples/jsm/postprocessing/ShaderPass' {
    export class ShaderPass {
        constructor(shader: object, textureID?: string);
        textureID: string;
        uniforms: object;
        material: any;
        renderToScreen: boolean;
    }
}

declare module 'three/examples/jsm/shaders/LuminosityShader' {
    export const LuminosityShader: object;
}

declare module 'three/examples/jsm/shaders/SobelOperatorShader' {
    export const SobelOperatorShader: object;
}

declare module 'three/examples/jsm/postprocessing/OutlinePass' {
    import { Scene, Camera, Vector2, Color } from 'three';

    export class OutlinePass {
        constructor(resolution: Vector2, scene: Scene, camera: Camera, selectedObjects?: any[]);
        renderScene: Scene;
        renderCamera: Camera;
        selectedObjects: any[];
        visibleEdgeColor: Color;
        hiddenEdgeColor: Color;
        edgeGlow: number;
        usePatternTexture: boolean;
        edgeStrength: number;
        edgeThickness: number;
        pulsePeriod: number;
        resolution: Vector2;
        blurDirectionX: Vector2;
        blurDirectionY: Vector2;
        kernelSize: number;
        glowCompose: object;
        renderTargetMaskBuffer: any;
        renderTargetDepth: any;
        renderTargetMask: any;
        copyUniforms: object;
        material: object;
        fsQuad: object;
        tempPulseColor1: Color;
        tempPulseColor2: Color;
        changeVisibilityOfSelectedObjects(bVisible: boolean): void;
        changeVisibilityOfNonSelectedObjects(bVisible: boolean): void;
        unPackOpacity(object: any): void;
        packOpacity(object: any): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/UnrealBloomPass' {
    import { Vector2, Camera, Scene, Texture } from 'three';

    export class UnrealBloomPass {
        constructor(resolution: Vector2, strength: number, radius: number, threshold: number);
        resolution: Vector2;
        strength: number;
        radius: number;
        threshold: number;
        renderToScreen: boolean;
        setSize(width: number, height: number): void;
    }
}

declare module 'three/examples/jsm/postprocessing/SMAAPass' {
    import { Scene, Camera, WebGLRenderer, WebGLRenderTarget, Vector2 } from 'three';

    export class SMAAPass {
        constructor(resolution: Vector2);
        render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
        setSize(width: number, height: number): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/SAOPass' {
    import { Scene, Camera, Mesh, Vector2 } from 'three';

    export class SAOPass {
        constructor(scene: Scene, camera: Camera, depthTexture?: Texture, use  ?: boolean, resolution?: Vector2);
        scene: Scene;
        camera: Camera;
        resolution: Vector2;
        saoKernelRadius: number;
        saoIntensity: number;
        saoScale: number;
        saoBias: number;
        saoBlurRadius: number;
        saoBlurStdDev: number;
        saoBlurDepthCutoff: number;
        params: { [key: string]: any };
        render(renderer: any, writeBuffer: any, readBuffer: any, deltaTime: number, maskActive: boolean): void;
        setSize(width: number, height: number): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/SSAOPass' {
    import { Scene, Camera, Mesh, Vector2 } from 'three';

    export class SSAOPass {
        constructor(scene: Scene, camera: Camera, width: number, height: number);
        scene: Scene;
        camera: Camera;
        width: number;
        height: number;
        kernelRadius: number;
        minDistance: number;
        maxDistance: number;
        output: number;
        render(renderer: any, writeBuffer: any, readBuffer: any, deltaTime: number, maskActive: boolean): void;
        setSize(width: number, height: number): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/FXAAPass' {
    import { ShaderMaterial, WebGLRenderTarget } from 'three';

    export class FXAAPass {
        constructor();
        material: ShaderMaterial;
        renderToScreen: boolean;
        setSize(width: number, height: number): void;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
    }
}

declare module 'three/examples/jsm/postprocessing/GlitchPass' {
    import { WebGLRenderTarget } from 'three';

    export class GlitchPass {
        constructor(dt_size?: number);
        uniforms: object;
        material: object;
        fsQuad: object;
        goWild: boolean;
        curF: number;
        generateTrigger: boolean;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/AfterimagePass' {
    import { WebGLRenderTarget } from 'three';

    export class AfterimagePass {
        constructor(damp?: number);
        uniforms: object;
        material: object;
        fsQuad: object;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/FilmPass' {
    import { WebGLRenderTarget } from 'three';

    export class FilmPass {
        constructor(noiseIntensity?: number, scanlinesIntensity?: number, scanlinesCount?: number, grayscale?: boolean);
        uniforms: object;
        material: object;
        fsQuad: object;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/DotScreenPass' {
    import { WebGLRenderTarget } from 'three';

    export class DotScreenPass {
        constructor(center?: any, angle?: number, scale?: number);
        uniforms: object;
        material: object;
        fsQuad: object;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/HalftonePass' {
    import { WebGLRenderTarget } from 'three';

    export class HalftonePass {
        constructor(width: number, height: number, params: object);
        uniforms: object;
        material: object;
        fsQuad: object;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/BloomPass' {
    import { WebGLRenderTarget } from 'three';

    export class BloomPass {
        constructor(strength?: number, kernelSize?: number, sigma?: number, resolution?: number);
        uniforms: object;
        material: object;
        fsQuad: object;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/BokehPass' {
    import { Scene, Camera, WebGLRenderTarget } from 'three';

    export class BokehPass {
        constructor(scene: Scene, camera: Camera, params: object);
        uniforms: object;
        materialBokeh: object;
        fsQuad: object;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/ClearPass' {
    import { Color } from 'three';

    export class ClearPass {
        constructor(clearColor?: Color | string | number, clearAlpha?: number);
        clearColor: Color | string | number;
        clearAlpha: number;
        clear: boolean;
        needsSwap: boolean;
        renderToScreen: boolean;
    }
}

declare module 'three/examples/jsm/postprocessing/MaskPass' {
    import { Scene, Camera, WebGLRenderTarget } from 'three';

    export class MaskPass {
        constructor(scene: Scene, camera: Camera);
        scene: Scene;
        camera: Camera;
        inverse: boolean;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
    }
}

declare module 'three/examples/jsm/postprocessing/SavePass' {
    import { WebGLRenderTarget } from 'three';

    export class SavePass {
        constructor(renderTarget?: WebGLRenderTarget);
        textureID: string;
        renderTarget: WebGLRenderTarget;
        uniforms: object;
        material: object;
        fsQuad: object;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
    }
}

declare module 'three/examples/jsm/postprocessing/TexturePass' {
    import { Texture, Scene, Camera, WebGLRenderTarget } from 'three';

    export class TexturePass {
        constructor(map: Texture, opacity?: number);
        map: Texture;
        opacity: number;
        uniforms: object;
        material: object;
        fsQuad: object;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
    }
}

declare module 'three/examples/jsm/postprocessing/CubeTexturePass' {
    import { CubeTexture, Scene, Camera, WebGLRenderTarget } from 'three';

    export class CubeTexturePass {
        constructor(camera: Camera, envMap?: CubeTexture, opacity?: number);
        camera: Camera;
        envMap: CubeTexture;
        opacity: number;
        uniforms: object;
        material: object;
        fsQuad: object;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
    }
}

declare module 'three/examples/jsm/postprocessing/SSAARenderPass' {
    import { Scene, Camera, WebGLRenderTarget } from 'three';

    export class SSAARenderPass {
        constructor(scene: Scene, camera: Camera, clearColor: any, clearAlpha: any);
        scene: Scene;
        camera: Camera;
        sampleLevel: number;
        unbiased: boolean;
        clearColor: any;
        clearAlpha: any;
        copyUniforms: object;
        copyMaterial: object;
        copyQuad: object;
        fsQuad: object;
        sampleRenderTarget: WebGLRenderTarget;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
        setSize(width: number, height: number): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/TAARenderPass' {
    import { Scene, Camera, WebGLRenderTarget } from 'three';

    export class TAARenderPass {
        constructor(scene: Scene, camera: Camera, clearColor: any, clearAlpha: any);
        scene: Scene;
        camera: Camera;
        sampleLevel: number;
        unbiased: boolean;
        clearColor: any;
        clearAlpha: any;
        copyUniforms: object;
        copyMaterial: object;
        copyQuad: object;
        fsQuad: object;
        sampleRenderTarget: WebGLRenderTarget;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
        setSize(width: number, height: number): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/RenderPixelatedPass' {
    import { Scene, Camera, WebGLRenderTarget, Vector2 } from 'three';

    export class RenderPixelatedPass {
        constructor(pixelSize: number, scene: Scene, camera: Camera);
        pixelSize: number;
        resolution: Vector2;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
        setSize(width: number, height: number): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/SSRPass' {
    import { Scene, Camera, WebGLRenderTarget, Vector2 } from 'three';

    export class SSRPass {
        constructor(scene: Scene, camera: Camera, params?: object);
        width: number;
        height: number;
        clear: boolean;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
        setSize(width: number, height: number): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/GTAOPass' {
    import { Scene, Camera, WebGLRenderTarget, Vector2 } from 'three';

    export class GTAOPass {
        constructor(scene: Scene, camera: Camera, width: number, height: number);
        scene: Scene;
        camera: Camera;
        output: number;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
        setSize(width: number, height: number): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/LUTPass' {
    import { Texture, WebGLRenderTarget } from 'three';

    export class LUTPass {
        constructor(lut?: Texture, intensity?: number);
        lut: Texture;
        intensity: number;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/OutputPass' {
    import { WebGLRenderTarget } from 'three';

    export class OutputPass {
        constructor();
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
        dispose(): void;
    }
}

declare module 'three/examples/jsm/postprocessing/RenderTransitionPass' {
    import { Scene, Camera, WebGLRenderTarget, Texture } from 'three';

    export class RenderTransitionPass {
        constructor(scene: Scene, camera: Camera, transitionTexture: Texture, transitionStrength?: number);
        scene: Scene;
        camera: Camera;
        transitionTexture: Texture;
        transitionStrength: number;
        render(renderer: any, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
        dispose(): void;
    }
}

