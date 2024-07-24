<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use Illuminate\Support\Facades\Log;

class NoteController extends Controller
{
    public function index()
    {
        return Note::all();
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|min:2|max:255',
                'content' => 'required|min:2|max:1000'
            ]);

            $note = Note::create([
                'title' => $request->title,
                'content' => $request->content
            ]);

            return response()->json($note, 201);
        } catch (\Exception $e) {
            Log::error('Erro ao criar a nota: ' . $e->getMessage());

            return response()->json([
                'error' => 'Erro ao criar a nota',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Note $note)
    {
        return $note;
    }

    public function update(Request $request, Note $note)
    {
        try {
            $request->validate([
                'title' => 'required|min:2|max:255',
                'content' => 'required|min:2|max:1000'
            ]);

            $note->update([
                'title' => $request->title,
                'content' => $request->content
            ]);

            return response()->json($note, 200);
        } catch (\Exception $e) {
            Log::error('Erro ao atualizar a nota: ' . $e->getMessage());
            return response()->json([
                'error' => 'Erro ao atualizar a nota',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Note $note)
    {
        try {
            $note->delete();
            return response()->json(['message' => 'Nota deletada com sucesso.'], 200);
        } catch (\Exception $e) {
            Log::error('Erro ao deletar a nota: ' . $e->getMessage());

            return response()->json([
                'error' => 'Erro ao deletar a nota',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
