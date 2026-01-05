import { Input, Select } from './ui';
import { AVATARS, BIRTH_YEARS } from '../lib/types';

interface ExplorerFormProps {
  name: string;
  onNameChange: (name: string) => void;
  birthYear: string;
  onBirthYearChange: (year: string) => void;
  avatar: string;
  onAvatarChange: (avatar: string) => void;
  errors?: {
    name?: string;
    birthYear?: string;
  };
}

export function ExplorerForm({
  name,
  onNameChange,
  birthYear,
  onBirthYearChange,
  avatar,
  onAvatarChange,
  errors = {},
}: ExplorerFormProps) {
  return (
    <>
      <Input
        label="Nome"
        value={name}
        onChange={(e) => onNameChange(e.target.value.slice(0, 50))}
        placeholder="Nome do explorador"
        icon="👤"
        error={errors.name}
        required
        maxLength={50}
      />

      <Select
        label="Ano de nascimento"
        value={birthYear}
        onChange={onBirthYearChange}
        options={BIRTH_YEARS}
        placeholder="Selecionar ano..."
        icon="📅"
        error={errors.birthYear}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-800">
          Avatar
        </label>
        <div className="grid grid-cols-8 gap-2">
          {AVATARS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => onAvatarChange(a)}
              className={`w-10 h-10 rounded-lg text-xl transition-all ${
                avatar === a
                  ? 'scale-110 shadow-md ring-2 ring-primary'
                  : 'opacity-60 hover:opacity-100'
              }`}
              style={{ backgroundColor: avatar === a ? '#F5A623' : '#f3f4f6' }}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
