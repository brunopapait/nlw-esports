import { MagnifyingGlassPlus } from "phosphor-react";

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
      <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
        <div>
          <strong className="text-2xl text-white font-black block">
            Não encontrou o seu duo ?
          </strong>
          <span className="text-zinc-400">
            Publique um anúncio e para encontrar novos players !
          </span>
        </div>

        <button
          className="py-3 px-4 bg-violet-500 text-white rounded-md hover:bg-violet-600 flex flex-items-center gap-2"
          type="button"
        >
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </button>
      </div>
    </div>
  );
}
