import 'react';

// Attributs de l'API déclarative WebMCP (https://github.com/webmachinelearning/webmcp/blob/main/declarative-api-explainer.md)
declare module 'react' {
    interface FormHTMLAttributes<T> {
        toolname?: string;
        tooldescription?: string;
    }
    interface InputHTMLAttributes<T> {
        toolparamdescription?: string;
    }
    interface TextareaHTMLAttributes<T> {
        toolparamdescription?: string;
    }
}
