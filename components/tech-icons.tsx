import React from "react"

// Using official brand logos from downloaded SVGs and CDN
export const TechIcons = {
  Python: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/python.svg" alt="Python" {...props} />
  ),
  React: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/react.svg" alt="React" {...props} />
  ),
  TypeScript: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/typescript.svg" alt="TypeScript" {...props} />
  ),
  AWS: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/aws-color.svg" alt="AWS" {...props} />
  ),
  PostgreSQL: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/postgresql.svg" alt="PostgreSQL" {...props} />
  ),
  Docker: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/docker.svg" alt="Docker" {...props} />
  ),
  NextJS: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/nextjs.svg" alt="Next.js" {...props} />
  ),
  Tailwind: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/tailwind.svg" alt="Tailwind CSS" {...props} />
  ),
  Mapbox: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/mapbox.svg" alt="Mapbox" {...props} />
  ),
  QGIS: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/qgis.svg" alt="QGIS" {...props} />
  ),
  Git: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/git.svg" alt="Git" {...props} />
  ),
  LangChain: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/langchain.svg" alt="LangChain" {...props} />
  ),
  LlamaIndex: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/llamaindex-color.svg" alt="LlamaIndex" {...props} />
  ),
  Claude: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/claude-color.svg" alt="Claude" {...props} />
  ),
  OpenAI: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/openai.svg" alt="OpenAI" {...props} />
  ),
  HuggingFace: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/huggingface.svg" alt="Hugging Face" {...props} />
  ),
  PyTorch: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/pytorch.svg" alt="PyTorch" {...props} />
  ),
  TensorFlow: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/tensorflow.svg" alt="TensorFlow" {...props} />
  ),
  DeepSeek: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="/images/deepseek-color.svg" alt="DeepSeek" {...props} />
  )
}
