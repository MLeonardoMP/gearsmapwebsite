import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Volve - GearsMap',
  description: 'Visualizador Volve',
};

export default function VolvePage() {
  return (
    <div className="w-full h-screen mt-16">
      <iframe 
        src="https://geofieldvisor-axfkgaaugdexekhw.brazilsouth-01.azurewebsites.net"
        className="w-full h-full border-0" 
        title="Volve Visor"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
      />
    </div>
  );
}

    
