import React from "react";
import "@/styles/globals.css"


export default function PtEdTechPage() {



  return (
      <div className="min-h-screen bg-black text-cyan-400 p-8 font-mono">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl mb-4 uppercase tracking-wider">PTEDTECH — ПУТЬ К СОВРЕМЕННОМУ ОБРАЗОВАНИЮ</h1>
          <p className="text-xl mb-8">ИННОВАЦИОННАЯ ПЛАТФОРМА. ТРАНСФОРМИРУЕМ ОБУЧЕНИЕ В ЦИФРОВОЙ ФОРМАТ</p>

              <section key={1} className="mb-12">
                <h2 className="text-2xl border-b border-cyan-400 pb-2 mb-4 uppercase">
                  РЕГИСТРАЦИЯ
                </h2>

                    <form className="space-y-4">
                      <div>
                        <label className="block mb-1">Логин:</label>
                        <input
                            type="text"
                            name="username"
                            className="bg-black border border-cyan-400 px-3 py-2 w-full"
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Пароль:</label>
                        <input
                            type="password"
                            name="password"
                            className="bg-black border border-cyan-400 px-3 py-2 w-full"
                        />
                      </div>
                      <button
                          type="submit"
                          className="border border-cyan-400 px-4 py-2 hover:bg-cyan-400 hover:text-black transition"
                      >
                        ЗАРЕГИСТРИРОВАТЬСЯ
                      </button>
                    </form>
              </section>
          ))
        </div>
      </div>
  );
}