import { useCallback, useEffect, useState, FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as CheckBox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Check, GameController } from "phosphor-react";
import { Input } from "./Form/Input";
import axios from "axios";

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  const loadGames = useCallback(() => {
    axios
      .get("http://localhost:3333/games")
      .then((response) => setGames(response.data));
  }, []);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) return;

    try {
      await axios.post(`http://localhost:3333/ads`, {
        gameId: data.game,
        name: data.name,
        yearsPlaying: Number(data.yoursPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel,
      });

      alert("Anúncio criado com sucesso!");
    } catch (error) {
      alert("Erro ao criar anúncio");
      console.log(error);
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game ?
            </label>
            <select
              id="game"
              name="game"
              defaultValue=""
              placeholder="Selecione o game em que deseja jogar"
              className="bg-zinc-900 py-3 px-4 text-sm placeholder:text-zinc-500 appearance-none"
            >
              <option disabled value="">
                Selecione o game em que deseja jogar
              </option>

              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname) ?</label>
            <Input
              id="name"
              name="name"
              placeholder="Como te chamam dentro do game ?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yoursPlaying">Joga a quanto tempo ?</label>
              <Input
                id="yoursPlaying"
                name="yoursPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual o seu discord ?</label>
              <Input id="discord" name="discord" placeholder="Usuário#0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar ?</label>
              <ToggleGroup.Root
                onValueChange={setWeekDays}
                value={weekDays}
                type="multiple"
                className="grid grid-cols-4 gap-2"
              >
                <ToggleGroup.Item
                  value="0"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Domingo"
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Segunda-feira"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Terça-feira"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Quarta-feira"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Quinta-feira"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Sexta-feira"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Sábado"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="hourStart">Qual o horário do dia ?</label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                id="hourStart"
                name="hourStart"
                type="time"
                placeholder="De"
              />
              <Input
                id="hourEnd"
                name="hourEnd"
                type="time"
                placeholder="Até"
              />
            </div>
          </div>
          <label className="mt-2 flex gap-2 text-sm text-white items-center">
            <CheckBox.Root
              onCheckedChange={(checked) =>
                setUseVoiceChannel(checked === true ? checked : false)
              }
              checked={useVoiceChannel}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <CheckBox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </CheckBox.Indicator>
            </CheckBox.Root>
            Costumo me conectar ao chat de voz !
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold text-white hover:bg-zinc-600"
              type="button"
            >
              Cancelar
            </Dialog.Close>
            <button
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold text-white flex items-center gap-3 hover:bg-violet-600"
              type="submit"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
