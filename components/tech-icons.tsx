import Image from "next/image"
import type { ComponentProps } from "react"

type TechIconProps = Omit<ComponentProps<typeof Image>, "src" | "alt" | "width" | "height">

function createTechIcon(src: string, alt: string) {
  return function TechIcon(props: TechIconProps) {
    return <Image src={src} alt={alt} width={28} height={28} {...props} />
  }
}

export const TechIcons = {
  Python: createTechIcon("/images/python.svg", "Python"),
  React: createTechIcon("/images/react.svg", "React"),
  TypeScript: createTechIcon("/images/typescript.svg", "TypeScript"),
  AWS: createTechIcon("/images/aws-color.svg", "AWS"),
  PostgreSQL: createTechIcon("/images/postgresql.svg", "PostgreSQL"),
  Docker: createTechIcon("/images/docker.svg", "Docker"),
  NextJS: createTechIcon("/images/nextjs.svg", "Next.js"),
  Tailwind: createTechIcon("/images/tailwind.svg", "Tailwind CSS"),
  Mapbox: createTechIcon("/images/mapbox.svg", "Mapbox"),
  QGIS: createTechIcon("/images/qgis.svg", "QGIS"),
  Git: createTechIcon("/images/git.svg", "Git"),
  LangChain: createTechIcon("/images/langchain.svg", "LangChain"),
  LlamaIndex: createTechIcon("/images/llamaindex-color.svg", "LlamaIndex"),
  Claude: createTechIcon("/images/claude-color.svg", "Claude"),
  OpenAI: createTechIcon("/images/openai.svg", "OpenAI"),
  HuggingFace: createTechIcon("/images/huggingface.svg", "Hugging Face"),
  PyTorch: createTechIcon("/images/pytorch.svg", "PyTorch"),
  TensorFlow: createTechIcon("/images/tensorflow.svg", "TensorFlow"),
  DeepSeek: createTechIcon("/images/deepseek-color.svg", "DeepSeek"),
  DotNet: createTechIcon("/images/dotnet.svg", ".NET"),
  CSharp: createTechIcon("/images/csharp.svg", "C#"),
  PowerShell: createTechIcon("/images/powershell.svg", "PowerShell"),
  Azure: createTechIcon("/images/azure.svg", "Azure"),
  Vercel: createTechIcon("/images/Vercel_dark.svg", "Vercel"),
  Blazor: createTechIcon("/images/blazor.svg", "Blazor"),
}
