import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 text-center">
      <div className="space-y-4 max-w-md">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          [ 404 — NÃO ENCONTRADO ]
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-light">
          Página não encontrada
        </h1>
        <p className="text-sm text-muted-foreground">
          O quadro ou página que você está procurando não existe ou foi movido.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center text-xs uppercase tracking-widest px-6 py-3 bg-foreground text-background font-mono hover:opacity-90 transition-opacity"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
